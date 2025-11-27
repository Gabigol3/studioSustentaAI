'use client';

import { useRef, useEffect, useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import L, { Icon, Map as LeafletMap } from 'leaflet';

type GreenArea = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
};

// Ícone personalizado para os marcadores do mapa
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});


export function MapView() {
  const firestore = useFirestore();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const greenAreasQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'green_areas') : null),
    [firestore]
  );
  const { data: greenAreas, isLoading } = useCollection<GreenArea>(greenAreasQuery);
  const position: [number, number] = [-23.55052, -46.633308]; // São Paulo

  useEffect(() => {
    // Inicializa o mapa apenas se o container estiver disponível e o mapa não tiver sido criado
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView(position, 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
    }

    // Adiciona os marcadores quando os dados de greenAreas estiverem disponíveis
    if (mapRef.current && greenAreas) {
        // Limpa marcadores antigos antes de adicionar novos
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapRef.current?.removeLayer(layer);
            }
        });

        greenAreas.forEach((area) => {
            L.marker([area.latitude, area.longitude], { icon: customIcon })
            .addTo(mapRef.current!)
            .bindPopup(`<b>${area.name}</b><br>${area.description}`);
        });
    }

    // Função de limpeza para destruir o mapa quando o componente for desmontado
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [greenAreas, position]);


  if (isLoading) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }


  return (
    <div ref={mapContainerRef} className="w-full h-full" />
  );
}

// Exportando o componente diretamente, pois a importação dinâmica já é feita na página.
export default MapView;
