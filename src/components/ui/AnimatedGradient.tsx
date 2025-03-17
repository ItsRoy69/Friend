
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGradient = ({ className, children }: AnimatedGradientProps) => {
  return (
    <div className={cn(
      "absolute inset-0 opacity-50 mask-radial-faded",
      "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100",
      "animate-gradient-shift",
      className
    )}>
      {children}
    </div>
  );
};

export default AnimatedGradient;
