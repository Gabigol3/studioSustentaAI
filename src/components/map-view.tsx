import { MapPin } from 'lucide-react';
import { Card } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function MapView() {
    const mapPlaceholderImage = PlaceHolderImages.find(p => p.id === 'map-placeholder');
  // The Vis.GL map component requires an API key and more complex setup.
  // This placeholder informs the developer about the next steps.
  return (
    <Card className="w-full h-full flex flex-col items-center justify-center bg-secondary relative overflow-hidden">
        {mapPlaceholderImage && (
            <Image
                src={mapPlaceholderImage.imageUrl}
                alt="Mapa"
                fill
                className="object-cover opacity-30"
                data-ai-hint={mapPlaceholderImage.imageHint}
            />
        )}
      <div className="z-10 text-center p-8 bg-background/80 backdrop-blur-sm rounded-lg">
        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Mapa Interativo em Breve</h2>
        <p className="text-muted-foreground">
          Para ativar o mapa, configure sua chave de API do Google Maps nas variáveis de ambiente.
        </p>
      </div>
    </Card>
  );
}
