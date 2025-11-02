'use client';

import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";
import Link from "next/link";

export default function MapPage() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=pontos+de+reciclagem+perto+de+mim";

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
      <div className="text-center">
        <Recycle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-2">Encontre Pontos de Coleta</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Clique no botão abaixo para encontrar os pontos de reciclagem mais próximos de você e ajude a preservar o meio ambiente.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground font-bold transition-all duration-300 transform hover:scale-105">
          <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <Recycle className="mr-2 h-5 w-5" />
            Buscar Pontos de Reciclagem
          </Link>
        </Button>
      </div>
    </div>
  );
}
