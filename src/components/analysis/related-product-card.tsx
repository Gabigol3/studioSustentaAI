import type { RecommendedProduct } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

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
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
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
        <div className="p-4">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-primary">{product.price}</p>
            <Badge variant="outline" className={cn(sustainabilityBadgeVariant(product.sustainability.label))}>
              {product.sustainability.icon} {product.sustainability.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground">{product.summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={product.storeUrl}>
            Ir para a loja <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
