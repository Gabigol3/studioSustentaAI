
'use client';

import { analyzeProductImage, type AnalyzeProductImageOutput } from '@/ai/flows/analyze-product-image-for-sustainability';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { FileUploader } from './file-uploader';
import { LoadingView } from './loading-view';
import { ResultsView } from './results-view';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { analyzeProductText } from '@/ai/flows/analyze-product-text-for-sustainability';
import { summarizeEnvironmentalImpact } from '@/ai/flows/summarize-environmental-impact';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type ViewState = 'form' | 'loading' | 'results' | 'error';
type ResultState = AnalyzeProductImageOutput & { image?: string; summary?: string; };

const MAX_IMAGE_WIDTH = 1280;
const MAX_IMAGE_HEIGHT = 720;
const IMAGE_QUALITY = 0.8;

// Função para redimensionar a imagem no cliente
const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_IMAGE_WIDTH) {
            height *= MAX_IMAGE_WIDTH / width;
            width = MAX_IMAGE_WIDTH;
          }
        } else {
          if (height > MAX_IMAGE_HEIGHT) {
            width *= MAX_IMAGE_HEIGHT / height;
            height = MAX_IMAGE_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Não foi possível obter o contexto do canvas.'));
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', IMAGE_QUALITY));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};


export function AnalysisView() {
  const [view, setView] = useState<ViewState>('form');
  const [activeTab, setActiveTab] = useState('text');
  const [analysisResult, setAnalysisResult] = useState<ResultState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setImagePreviewUrl(URL.createObjectURL(selectedFile));
    toast({
      title: "Imagem selecionada",
      description: selectedFile.name,
    });
  };
  
  const handleAnalyze = async () => {
    if (activeTab === 'image' && !file) {
      toast({
        variant: "destructive",
        title: "Nenhuma imagem fornecida",
        description: "Por favor, envie uma imagem para análise.",
      });
      return;
    }
    if (activeTab === 'text' && !productName) {
        toast({
            variant: "destructive",
            title: "Nenhum nome de produto fornecido",
            description: "Por favor, digite o nome do produto para análise.",
        });
        return;
    }
    
    setView('loading');
    setError(null);
    
    try {
      let result: AnalyzeProductImageOutput;
      let imageUrl: string | undefined;

      if (activeTab === 'image' && file) {
        // Redimensiona a imagem ANTES de enviar
        imageUrl = await resizeImage(file);
        result = await analyzeProductImage({ productDataUri: imageUrl });
      } else if (activeTab === 'text' && productName) {
        if (!firestore) {
          throw new Error('O serviço de banco de dados não está disponível. Tente novamente mais tarde.');
        }

        const productsRef = collection(firestore, 'products');
        const q = query(productsRef, where('name', '==', productName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const productData = querySnapshot.docs[0].data();
            result = {
              isProduct: true,
              productName: productData.name,
              carbonFootprint: productData.carbonFootprint,
              waterFootprint: productData.waterFootprint,
              energeticFootprint: 0,
              ecologicalFootprint: 0,
              landUse: 0,
              environmentalImpactDescription: productData.impact, 
              economyScore: productData.economyScore,
              societyScore: productData.societyScore,
              environmentScore: productData.environmentScore,
              totalScore: productData.finalScore,
              sustainabilityCategory: productData.impact,
            };
            imageUrl = productData.imageUrl;
        } else {
            result = await analyzeProductText({ productName, productDescription });
            // Não tentamos mais gerar uma imagem, imageUrl permanecerá undefined
            imageUrl = undefined;
        }
      } else {
        throw new Error("Nenhuma entrada para analisar.");
      }

      if (!result || !result.isProduct) {
        throw new Error('Produto não reconhecido. Por favor, insira um produto válido ou envie a foto de um produto.');
      }
      
      const summaryResult = await summarizeEnvironmentalImpact({
        productName: result.productName,
        carbonFootprint: result.carbonFootprint,
        waterFootprint: result.waterFootprint,
        sustainabilityCategory: result.sustainabilityCategory,
      });

      setAnalysisResult({ ...result, image: imageUrl, summary: summaryResult.summary });
      setView('results');

    } catch (e: any) {
      console.error("Erro detalhado da análise:", e);
      if (e.message && (e.message.toLowerCase().includes('quota') || e.message.toLowerCase().includes('rate limit'))) {
        setError('Limite diário de análises atingido. Por favor, tente novamente amanhã.');
      } else if (e.message && e.message.includes('Produto não reconhecido')) {
        setError(e.message);
      } else if (e.message && e.message.toLowerCase().includes('body exceeded')) {
        setError('Ocorreu um erro no envio. A imagem pode ser muito grande, mesmo após a otimização. Tente novamente.');
      } else {
        setError('Ocorreu um erro na análise. Verifique sua conexão ou tente novamente mais tarde.');
      }
      setView('error');
    }
  };

  const resetView = () => {
    setView('form');
    setAnalysisResult(null);
    setError(null);
    setFile(null);
    setProductName('');
    setProductDescription('');
    if(imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        setImagePreviewUrl(null);
    }
  };

  const clearFile = () => {
    if(imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setFile(null);
    setImagePreviewUrl(null);
  }

  if (view === 'loading') {
    return <LoadingView />;
  }

  if (view === 'results' && analysisResult) {
    return <ResultsView result={analysisResult} onReset={resetView} />;
  }
  
  if (view === 'error') {
    return (
        <div className="max-w-2xl mx-auto text-center py-16">
            <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold font-headline mb-2">Ops! Algo deu errado.</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={resetView}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Tentar Novamente
            </Button>
        </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-2 border-primary/10">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-headline">Descubra o impacto ambiental</CardTitle>
        <CardDescription className="text-base">
          Escolha uma das opções abaixo para analisar um produto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Texto</TabsTrigger>
                <TabsTrigger value="image">Imagem</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="product-name">Nome do Produto</Label>
                    <Input
                        id="product-name"
                        placeholder="Ex: Garrafa de Aço Inoxidável"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="product-description">Descrição (Opcional)</Label>
                    <Textarea
                        id="product-description"
                        placeholder="Descreva o produto, seus materiais, origem, etc."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>
            </TabsContent>
            <TabsContent value="image" className="pt-4">
            {imagePreviewUrl ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <Image src={imagePreviewUrl} alt="Pré-visualização do produto" fill className="object-cover" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full h-8 w-8 z-10"
                        onClick={clearFile}
                    >
                    <RotateCcw className="h-4 w-4" />
                    <span className="sr-only">Trocar imagem</span>
                    </Button>
                </div>
                ) : (
                <FileUploader onFileSelect={handleFileSelect} />
                )}
            </TabsContent>
        </Tabs>
        
        <Button
          onClick={handleAnalyze}
          disabled={(activeTab === 'image' && !file) || (activeTab === 'text' && !productName)}
          className="w-full text-lg py-6 mt-6 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground font-bold transition-all duration-300 transform hover:scale-105"
        >
          Analisar Produto
        </Button>
      </CardContent>
    </Card>
  );
}

    

    
