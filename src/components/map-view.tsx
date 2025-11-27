'use client';

import { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/marker-shadow.png',
  shadowSize: [41, 41],
});


export function MapView() {
  const firestore = useFirestore();

  const greenAreasQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'green_areas') : null),
    [firestore]
  );
  const { data: greenAreas, isLoading } = useCollection<GreenArea>(greenAreasQuery);

  if (isLoading) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  const position: [number, number] = [-23.55052, -46.633308]; // São Paulo

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={position} 
        zoom={11} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {greenAreas && greenAreas.length > 0 && greenAreas.map((area) => (
          <Marker
            key={area.id}
            position={[area.latitude, area.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-base mb-1">{area.name}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Exportando o componente diretamente, pois a importação dinâmica já é feita na página.
export default MapView;