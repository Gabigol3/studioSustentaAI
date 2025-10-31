import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

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
    <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
            {memberImage ? (
                 <Image
                    src={memberImage.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover border-4 border-primary/20"
                    data-ai-hint={memberImage.imageHint}
                />
            ) : (
                <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground">...</span>
                </div>
            )}
        </div>
      <h3 className="text-lg font-bold font-headline">{member.name}</h3>
      <p className="text-primary font-semibold">{member.role}</p>
      <p className="text-sm text-muted-foreground">{member.course} - {member.year}</p>
    </div>
  );
}
