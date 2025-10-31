'use client';

import type { AnalyzeProductImageOutput } from "@/ai/flows/analyze-product-image-for-sustainability";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { ScoreCircle } from "./score-circle";
import { formatNumber } from "@/lib/utils";
import { Droplets, Footprints, RotateCcw } from "lucide-react";
import Image from "next/image";
import { RelatedProductCard } from "./related-product-card";
import { RECOMMENDED_PRODUCTS } from "@/lib/constants";
import { Badge } from "../ui/badge";

type ResultState = AnalyzeProductImageOutput & { image?: string; summary?: string; };

interface ResultsViewProps {
  result: ResultState;
  onReset: () => void;
}

export function ResultsView({ result, onReset }: ResultsViewProps) {
  const scoreCategory = (score: number) => {
    if (score >= 70) return { label: "Produto Sustentável", color: "bg-success text-success-foreground" };
    if (score >= 40) return { label: "Regular", color: "bg-warning text-warning-foreground" };
    return { label: "Alto Impacto", color: "bg-danger text-danger-foreground" };
  };

  const category = scoreCategory(result.totalScore);

  return (
    <div className="space-y-12">
      <Card className="shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 relative min-h-[250px] md:min-h-0">
                {result.image ? (
                    <Image src={result.image} alt={result.productName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground">Imagem não disponível</span>
                  </div>
                )}
            </div>
            <div className="md:col-span-3">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                            <CardTitle className="text-3xl font-headline">{result.productName}</CardTitle>
                            <CardDescription className="mt-1">{result.summary || result.environmentalImpactDescription}</CardDescription>
                        </div>
                        <Badge className={`${category.color} text-sm`}>{category.label}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="flex flex-col items-center gap-1 rounded-lg p-4 bg-secondary">
                            <Footprints className="w-8 h-8 text-primary"/>
                            <p className="text-sm text-muted-foreground">Pegada de Carbono</p>
                            <p className="text-2xl font-bold">{formatNumber(result.carbonFootprint)} <span className="text-sm font-normal">kg CO₂eq</span></p>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded-lg p-4 bg-secondary">
                            <Droplets className="w-8 h-8 text-accent"/>
                            <p className="text-sm text-muted-foreground">Pegada Hídrica</p>
                            <p className="text-2xl font-bold">{formatNumber(result.waterFootprint)} <span className="text-sm font-normal">litros</span></p>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-wrap justify-around items-center gap-4">
                        <ScoreCircle score={result.economyScore} label="Economia" color="yellow" />
                        <ScoreCircle score={result.societyScore} label="Sociedade" color="blue" />
                        <ScoreCircle score={result.environmentScore} label="Meio Ambiente" color="green" />
                        <ScoreCircle score={result.totalScore} label={category.label} size="large" totalScore />
                    </div>
                </CardContent>
            </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline text-center">Produtos Relacionados</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {RECOMMENDED_PRODUCTS.map(product => <RelatedProductCard key={product.name} product={product} />)}
        </div>
      </div>

      <div className="text-center">
        <Button onClick={onReset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Analisar outro produto
        </Button>
      </div>
    </div>
  );
}
