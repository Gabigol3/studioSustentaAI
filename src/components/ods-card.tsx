import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { OdsDataItem } from '@/lib/constants';

export function OdsCard({ ods }: { ods: OdsDataItem }) {
  const Icon = ods.icon;
  const colorStyle = { '--ods-color': ods.color } as React.CSSProperties;

  return (
    <Card
      style={colorStyle}
      className={cn(
        "flex flex-col h-full transition-all duration-300 group text-center border-2 border-transparent",
        "hover:border-[hsl(var(--ods-color))] hover:shadow-xl hover:-translate-y-1",
        ods.highlighted && "border-primary shadow-lg"
      )}
    >
      <CardHeader className="items-center">
        <div
          className={cn(
            "w-20 h-20 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300",
            "bg-secondary text-secondary-foreground",
            "group-hover:bg-[hsl(var(--ods-color))] group-hover:text-white"
          )}
        >
          <Icon className="w-12 h-12" />
        </div>
        <div className="flex items-center gap-3">
          {ods.id && (
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-md transition-colors duration-300",
                "bg-secondary text-secondary-foreground",
                "group-hover:bg-[hsl(var(--ods-color))] group-hover:text-white"
              )}
            >
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
