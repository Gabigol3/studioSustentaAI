import type { RecommendedProduct } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Leaf, Zap } from "lucide-react";
import { Separator } from "../ui/separator";

export function RelatedProductCard({ product }: { product: RecommendedProduct }) {
  const recommendationColor = product.recommendation === "muito" ? "bg-primary/20 text-primary-foreground" : "bg-secondary text-secondary-foreground";
  
  const sustainabilityBadgeVariant = (label: string) => {
    switch (label) {
      case 'Sustentável': return 'bg-success/20 text-success-foreground border-success/30';
      case 'Equilibrado': return 'bg-warning/20 text-warning-foreground border-warning/30';
      case 'Alto Impacto': return 'bg-danger/20 text-danger-foreground border-danger/30';
      default: return 'bg-muted text-muted-foreground';
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
            {product.image ? (
                <Image
                    src={product.image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.image.imageHint}
                />
            ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground">Sem imagem</span>
                </div>
            )}
          <Badge className={cn("absolute top-2 right-2", recommendationColor)}>
            {product.recommendation === "muito" ? "Recomenda muito" : "Recomenda"}
          </Badge>
        </div>
        <div className="p-4 pb-0">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-primary">{product.price}</p>
            <Badge variant="outline" className={cn("text-xs",sustainabilityBadgeVariant(product.sustainability.label))}>
              {product.sustainability.icon} {product.sustainability.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        <p className="text-sm text-muted-foreground">{product.summary}</p>
        
        {(typeof product.electricalFootprint === 'number' || product.usesWood) && <Separator />}

        <div className="space-y-2 text-sm">
            {typeof product.electricalFootprint === 'number' && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Pegada Elétrica: <span className="font-bold text-foreground">{product.electricalFootprint} kWh</span></span>
                </div>
            )}
            {product.usesWood && product.ecologicalFootprint && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Leaf className="w-4 h-4 text-green-500" />
                    <span>Pegada Ecológica (Madeira): <span className="font-bold text-foreground">{product.ecologicalFootprint}</span></span>
                </div>
            )}
        </div>

      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full">
          <Link href={product.storeUrl} target="_blank" rel="noopener noreferrer">
            Ir para a loja <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
