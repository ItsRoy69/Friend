
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  className?: string;
  children: React.ReactNode;
}

const GlassMorphism = ({ className, children }: GlassMorphismProps) => {
  return (
    <div 
      className={cn(
        "glassmorphism p-6 rounded-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
