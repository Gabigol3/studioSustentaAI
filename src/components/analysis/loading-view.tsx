'use client';

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingView() {
    const [progress, setProgress] = useState(10)

    useEffect(() => {
        const timer = setInterval(() => {
        setProgress(prev => {
            if (prev >= 95) {
                clearInterval(timer);
                return 95;
            }
            return prev + Math.random() * 10;
        });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const leaves = Array.from({ length: 10 });

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center animated-gradient overflow-hidden">
             {leaves.map((_, i) => (
                <Leaf
                    key={i}
                    className="floating-leaf text-primary"
                    style={{
                        left: `${Math.random() * 100}vw`,
                        animationDuration: `${10 + Math.random() * 15}s`,
                        animationDelay: `-${Math.random() * 20}s`,
                        width: `${20 + Math.random() * 30}px`,
                        height: `${20 + Math.random() * 30}px`,
                        transform: `translateX(${Math.random() * 20 - 10}vw)`
                    }}
                />
            ))}
            <div className="z-10 text-center text-foreground flex flex-col items-center">
                <h2 className="text-2xl md:text-4xl font-headline font-bold mb-4">Analisando impacto ambiental...</h2>
                <div className="w-64 md:w-96">
                    <Progress value={progress} className="w-full" />
                    <p className="mt-2 text-sm font-medium">{Math.round(progress)}%</p>
                </div>
            </div>
        </div>
    )
}
