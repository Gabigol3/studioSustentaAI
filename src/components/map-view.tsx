'use client';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useState } from 'react';
import { Card } from './ui/card';
import { AlertCircle, MapPin } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type GreenArea = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
};

export function MapView() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const firestore = useFirestore();

  const greenAreasQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'green_areas') : null),
    [firestore]
  );
  const { data: greenAreas, isLoading } = useCollection<GreenArea>(greenAreasQuery);
  const [selectedArea, setSelectedArea] = useState<GreenArea | null>(null);

  if (!apiKey) {
    return (
      <Card className="w-full h-full flex flex-col items-center justify-center bg-destructive/10 text-destructive-foreground p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Chave de API do Google Maps ausente</h2>
        <p>
          Para ativar o mapa, configure sua chave de API do Google Maps na variável de ambiente{' '}
          <code className="font-mono bg-destructive/20 px-1 py-0.5 rounded">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </code>
          .
        </p>
      </Card>
    );
  }
  
  if (isLoading) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  const position = { lat: -23.55052, lng: -46.633308 }; // São Paulo

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={10}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={'sustentaai-map'}
        >
          {greenAreas?.map((area) => (
            <AdvancedMarker
              key={area.id}
              position={{ lat: area.latitude, lng: area.longitude }}
              onClick={() => setSelectedArea(area)}
            >
              <Pin
                background={'hsl(var(--primary))'}
                borderColor={'hsl(var(--primary-foreground))'}
                glyphColor={'hsl(var(--primary-foreground))'}
              >
                  <MapPin/>
              </Pin>
            </AdvancedMarker>
          ))}

          {selectedArea && (
            <InfoWindow
              position={{
                lat: selectedArea.latitude,
                lng: selectedArea.longitude,
              }}
              onCloseClick={() => setSelectedArea(null)}
              minWidth={200}
            >
              <div>
                <h3 className="font-bold font-headline">{selectedArea.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedArea.description}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
