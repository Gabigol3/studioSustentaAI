import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

type Ods = {
  id?: number;
  title: string;
  description: string;
  icon?: string;
  imageId?: string;
  highlighted?: boolean;
}

export function OdsCard({ ods }: { ods: Ods }) {
    const odsImage = ods.imageId ? PlaceHolderImages.find(p => p.id === ods.imageId) : null;
  
  return (
    <Card className={cn(
        "flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        ods.highlighted && "bg-primary/10 border-primary shadow-lg"
    )}>
      <CardHeader>
        {odsImage ? (
            <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-md">
                <Image
                    src={odsImage.imageUrl}
                    alt={ods.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={odsImage.imageHint}
                />
            </div>
        ) : (
            <div className={cn(
              "w-16 h-16 rounded-lg flex items-center justify-center mb-4",
              ods.highlighted ? "bg-primary/20" : "bg-secondary"
            )}>
                <span className="text-2xl font-bold text-muted-foreground">{ods.icon}</span>
            </div>
        )}
        <CardTitle className="text-xl font-headline">{ods.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{ods.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
