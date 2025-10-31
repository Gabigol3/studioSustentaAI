import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 text-2xl font-bold text-foreground font-headline', className)}>
      Sustenta<span className="text-primary">AI</span>
    </Link>
  );
}
