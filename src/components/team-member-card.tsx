import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';

type TeamMember = {
  name: string;
  course: string;
  year: string;
  role: string;
  imageId: string;
};

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
  
  return (
    <Card className="text-center overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square w-full">
          {memberImage ? (
               <Image
                  src={memberImage.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                  data-ai-hint={memberImage.imageHint}
              />
          ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">...</span>
              </div>
          )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold font-headline">{member.name}</h3>
        <p className="text-primary font-semibold text-sm">{member.role}</p>
        <p className="text-xs text-muted-foreground mt-1">{member.course} - {member.year}</p>
      </CardContent>
    </Card>
  );
}
