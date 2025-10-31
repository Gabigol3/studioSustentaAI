'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { useState } from 'react';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-8">
            <Logo />
            <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                >
                {link.label}
                </Link>
            ))}
            </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
