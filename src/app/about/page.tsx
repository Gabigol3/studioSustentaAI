import { TeamMemberCard } from "@/components/team-member-card";
import { TEAM_MEMBERS } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-2">Sobre Nós</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conheça a equipe de estudantes por trás do SustentaAI.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
       <p className="text-center text-muted-foreground mt-16 max-w-2xl mx-auto">
        O SustentaAI é um projeto desenvolvido por estudantes comprometidos com um futuro mais sustentável.
      </p>
    </div>
  );
}
