import { TeamMemberCard } from "@/components/team-member-card";
import { TEAM_MEMBERS } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">Sobre Nossa Equipe</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conheça os estudantes apaixonados por tecnologia e sustentabilidade que estão construindo o SustentaAI.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12 max-w-7xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
