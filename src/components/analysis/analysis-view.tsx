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

type ViewState = 'form' | 'loading' | 'results' | 'error';

export function AnalysisView() {
  const [view, setView] = useState<ViewState>('form');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeProductImageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const { toast } = useToast();

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
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const dataUri = reader.result as string;
        try {
          const result = await analyzeProductImage({ productDataUri: dataUri });
          if (!result || !result.productName) {
            setError('Produto não reconhecido. Envie uma imagem de um item real.');
            setView('error');
          } else {
            setAnalysisResult(result);
            setView('results');
          }
        } catch (e) {
          console.error(e);
          setError('Ocorreu um erro na análise. Por favor, tente novamente mais tarde.');
          setView('error');
        }
      };
      reader.onerror = () => {
        setError('Erro ao processar o arquivo de imagem.');
        setView('error');
      };
    } else if (productName) {
       // The user request specifies DB lookup for product name.
       // The provided AI flow `analyzeProductImage` requires an image.
       // As a fallback, we show a message that this feature is in development.
       setError('A busca por nome de produto ainda não foi implementada. Por favor, envie uma imagem.');
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

  if (view === 'loading') {
    return <LoadingView />;
  }

  if (view === 'results' && analysisResult) {
    return <ResultsView result={analysisResult} onReset={resetView} uploadedImage={file} />;
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

        <FileUploader onFileSelect={handleFileSelect} />
        
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
