import { RelatedProductCard } from "@/components/analysis/related-product-card";
import { RECOMMENDED_PRODUCTS } from "@/lib/constants";

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">Produtos Sustentáveis</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore alternativas de produtos com menor impacto ambiental e que promovem um consumo mais consciente.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {RECOMMENDED_PRODUCTS.map((product) => (
            <RelatedProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
