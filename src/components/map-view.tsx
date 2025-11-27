'use client';

import { useRef, useEffect } from 'react';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import L, { Icon, Map as LeafletMap } from 'leaflet';
import { GREEN_AREAS_DATA, ECOPOINTS_DATA } from '@/lib/constants';

// Ícone padrão para Áreas Verdes
const greenAreaIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Ícone para Ecopontos (verde)
const ecopointIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});


export function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  // Centraliza o mapa na região de Leme/Araras/Rio Claro
  const position: [number, number] = [-22.33, -47.45]; 
  const zoomLevel = 10;

  useEffect(() => {
    // Inicializa o mapa apenas se o container estiver disponível e o mapa não tiver sido criado
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView(position, zoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;
    if (map) {
        // Limpa marcadores antigos antes de adicionar novos
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Adiciona marcadores para as áreas verdes
        GREEN_AREAS_DATA.forEach((area) => {
            L.marker([area.latitude, area.longitude], { icon: greenAreaIcon })
            .addTo(map)
            .bindPopup(`<b>${area.name}</b><br>${area.description}`);
        });

        // Adiciona marcadores para os ecopontos
        ECOPOINTS_DATA.forEach((point) => {
          L.marker([point.latitude, point.longitude], { icon: ecopointIcon })
          .addTo(map)
          .bindPopup(`<b>${point.name}</b><br>${point.address}<br><i>${point.city}</i>`);
      });
    }

    // Função de limpeza para destruir o mapa quando o componente for desmontado
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // O array de dependências vazio garante que o efeito rode apenas uma vez

  return (
    <div ref={mapContainerRef} className="w-full h-full" />
  );
}

// Exportando o componente diretamente
export default MapView;
