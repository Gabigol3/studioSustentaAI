import { MapView } from "@/components/map-view";

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline mb-2">Mapa Verde</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore parques, reservas e outras áreas verdes perto de você.
        </p>
      </div>
      <div className="aspect-video w-full">
        <MapView />
      </div>
    </div>
  );
}
