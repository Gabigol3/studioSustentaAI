import { OdsCard } from "@/components/ods-card";
import { ODS_DATA } from "@/lib/constants";

export default function OdsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-3 text-foreground">
            Objetivos de Desenvolvimento Sustentável
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Os 17 ODS foram estabelecidos pela ONU para um futuro melhor e mais sustentável para todos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ODS_DATA.map((ods) => (
            <OdsCard key={ods.id || ods.title} ods={ods} />
          ))}
        </div>
      </div>
    </div>
  );
}
