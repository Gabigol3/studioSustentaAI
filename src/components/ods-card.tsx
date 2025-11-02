import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type Ods = {
  id?: number;
  title: string;
  description: string;
  icon: LucideIcon;
  highlighted?: boolean;
}

export function OdsCard({ ods }: { ods: Ods }) {
  const Icon = ods.icon;
  
  return (
    <Card className={cn(
        "flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group text-center",
        ods.highlighted && "bg-primary/10 border-primary shadow-lg"
    )}>
      <CardHeader className="items-center">
        <div className={cn(
          "w-20 h-20 rounded-lg flex items-center justify-center mb-4 transition-colors",
          ods.highlighted ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
          "group-hover:bg-primary group-hover:text-primary-foreground"
        )}>
          <Icon className="w-12 h-12" />
        </div>
        <div className='flex items-center gap-3'>
            {ods.id && (
                <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-md",
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
