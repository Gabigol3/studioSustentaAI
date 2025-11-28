'use client';

import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import 'leaflet/dist/leaflet.css';

// Carrega o mapa dinamicamente para evitar problemas com SSR (Server-Side Rendering)
const MapView = dynamic(() => import('@/components/map-view').then(mod => mod.MapView), { 
  ssr: false,
  loading: () => <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg" />
});

export default function MapPage() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=pontos+de+reciclagem";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">Encontre Pontos de Coleta e Áreas Verdes</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore o mapa para descobrir parques e áreas de preservação ou clique no botão para encontrar pontos de reciclagem perto de você.
        </p>
        <Button asChild size="lg" className="mt-4 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground font-bold transition-all duration-300 transform hover:scale-105">
          <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <Recycle className="mr-2 h-5 w-5" />
            Buscar Pontos de Reciclagem
          </Link>
        </Button>
      </div>
      <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border">
        <MapView />
      </div>
    </div>
  );
}
