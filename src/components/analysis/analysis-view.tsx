'use client';

import { analyzeProductImage, type AnalyzeProductImageOutput } from '@/ai/flows/analyze-product-image-for-sustainability';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { FileUploader } from './file-uploader';
import { LoadingView } from './loading-view';
import { ResultsView } from './results-view';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { analyzeProductText } from '@/ai/flows/analyze-product-text-for-sustainability';
import { summarizeEnvironmentalImpact } from '@/ai/flows/summarize-environmental-impact';

type ViewState = 'form' | 'loading' | 'results' | 'error';
type ResultState = AnalyzeProductImageOutput & { image?: string; summary?: string; };

export function AnalysisView() {
  const [view, setView] = useState<ViewState>('form');
  const [analysisResult, setAnalysisResult] = useState<ResultState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const { toast } = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    if (!file) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setProductName('');
    toast({
      title: "Imagem selecionada",
      description: selectedFile.name,
    });
  };
  
  const handleAnalyze = async () => {
    if (!file && !productName) {
      toast({
        variant: "destructive",
        title: "Nenhum produto fornecido",
        description: "Por favor, envie uma imagem ou digite o nome de um produto.",
      });
      return;
    }
    
    setView('loading');
    setError(null);
    
    try {
      let result: AnalyzeProductImageOutput;
      let imageUrl: string | undefined;

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        imageUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject('Erro ao processar o arquivo de imagem.');
        });
        result = await analyzeProductImage({ productDataUri: imageUrl });

      } else if (productName) {
        if (!firestore) {
          throw new Error('O serviço de banco de dados não está disponível. Tente novamente mais tarde.');
        }

        const productsRef = collection(firestore, 'products');
        const q = query(productsRef, where('name', '==', productName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const productData = querySnapshot.docs[0].data();
            result = {
              productName: productData.name,
              carbonFootprint: productData.carbonFootprint,
              waterFootprint: productData.waterFootprint,
              environmentalImpactDescription: productData.impact, 
              economyScore: productData.economyScore,
              societyScore: productData.societyScore,
              environmentScore: productData.environmentScore,
              totalScore: productData.finalScore,
              sustainabilityCategory: productData.impact,
            };
            imageUrl = productData.imageUrl;
        } else {
            result = await analyzeProductText({ productName });
            // A geração de imagem foi removida para evitar o erro de faturamento da API.
            imageUrl = undefined;
        }
      } else {
        throw new Error("Nenhuma entrada para analisar.");
      }

      if (!result || !result.productName) {
        throw new Error('Produto não reconhecido. Forneça um nome ou imagem válidos.');
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
      console.error(e);
      setError(e.message || 'Ocorreu um erro na análise. Por favor, tente novamente mais tarde.');
      setView('error');
    }
  };

  const resetView = () => {
    setView('form');
    setAnalysisResult(null);
    setError(null);
    setFile(null);
    setProductName('');
  };

  const clearFile = () => {
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
        <CardTitle className="text-3xl md:text-4xl font-headline">Descubra o impacto ambiental do seu produto</CardTitle>
        <CardDescription className="text-base">
          Envie uma imagem, tire uma foto ou digite o nome do produto para começar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Input
            type="text"
            placeholder="Ou digite o nome de um produto..."
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              if (file) setFile(null);
            }}
            />
        </div>

        <div className="relative flex items-center">
            <div className="flex-grow border-t border-muted-foreground/20"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-sm">OU</span>
            <div className="flex-grow border-t border-muted-foreground/20"></div>
        </div>

        {imagePreviewUrl ? (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image src={imagePreviewUrl} alt="Pré-visualização do produto" fill className="object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full h-8 w-8"
              onClick={clearFile}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remover imagem</span>
            </Button>
          </div>
        ) : (
          <FileUploader onFileSelect={handleFileSelect} />
        )}
        
        <Button
          onClick={handleAnalyze}
          disabled={!file && !productName}
          className="w-full text-lg py-6 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground font-bold transition-all duration-300 transform hover:scale-105"
        >
          Analisar Produto
        </Button>
      </CardContent>
    </Card>
  );
}
