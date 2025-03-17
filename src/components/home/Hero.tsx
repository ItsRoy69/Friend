
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { cn } from '@/lib/utils';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      const elements = containerRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const depth = parseFloat((el as HTMLElement).dataset.depth || '0.1');
        const translateX = moveX * depth;
        const translateY = moveY * depth;
        (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 min-h-screen flex items-center" ref={containerRef}>
      <AnimatedGradient />
      
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-300/20 filter blur-3xl parallax" data-depth="0.2"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-purple-300/20 filter blur-3xl parallax" data-depth="0.1"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-block mb-6 px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full animate-fade-in"
          >
            <span className="text-sm font-medium text-blue-600">AI-powered website creation</span>
          </div>
          
          <h1 
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight md:leading-tight tracking-tight",
              "mb-6 animate-slide-up"
            )}
          >
            Create beautiful websites with <span className="text-gradient">AI</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" 
            style={{ animationDelay: '100ms' }}
          >
            Build professional websites and web applications faster than ever with our AI-powered platform that understands your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" className="rounded-lg px-8 button-transition">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="rounded-lg px-8 button-transition">
              How it works
            </Button>
          </div>
          
          <div 
            className="mt-16 animate-scale-in" 
            style={{ animationDelay: '400ms' }}
          >
            <GlassMorphism className="relative overflow-hidden rounded-2xl shadow-glass parallax" data-depth="0.05">
              <div className="aspect-video rounded-lg overflow-hidden shadow-subtle bg-white">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="text-muted-foreground/50 font-medium">AI-powered editor preview</div>
                </div>
              </div>
            </GlassMorphism>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
