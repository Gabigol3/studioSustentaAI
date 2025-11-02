import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type Ods = {
  id?: number;
  title: string;
  description: string;
  icon?: LucideIcon | string;
  imageId?: string;
  highlighted?: boolean;
}

export function OdsCard({ ods }: { ods: Ods }) {
    const odsImage = ods.imageId ? PlaceHolderImages.find(p => p.id === ods.imageId) : null;
  
  return (
    <Card className={cn(
        "flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group",
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
        ) : null}
        <div className='flex items-center gap-3'>
            {ods.id && (
                <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                    ods.highlighted ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}>
                    {ods.id}
                </div>
            )}
            <CardTitle className="text-xl font-headline">{ods.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-0">
        <CardDescription>{ods.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
