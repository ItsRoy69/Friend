import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paperclip } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState('');
  const [stylePreset, setStylePreset] = useState('modern');
  const navigate = useNavigate();

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

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      sessionStorage.setItem('websitePrompt', prompt);
      sessionStorage.setItem('stylePreset', stylePreset);
      navigate('/generate');
    }
  };

  const handleAttachClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setPrompt(prev => prev + "\n[Image reference attached]");
      }
    };
  };

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

          <div className="mt-16 animate-scale-in" style={{ animationDelay: '400ms' }}>
            <div className="relative ">
              <Textarea
                className="relative overflow-hidden rounded-2xl shadow-glass parallax px-4 py-4 pr-24 min-h-36"
                data-depth="0.05"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Lovable to create a portfolio website for a photographer..."
              />

              <div className="absolute bottom-2 flex flex-row gap-2">
                <Button
                  onClick={handleAttachClick}
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>

                <Select value={stylePreset} onValueChange={setStylePreset}>
                  <SelectTrigger className="w-32 h-9">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern & Clean</SelectItem>
                    <SelectItem value="glassmorphism">Glassmorphism</SelectItem>
                    <SelectItem value="neumorphism">Neumorphism</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="absolute bottom-2 right-2">
                <Button
                  onClick={handleGenerateClick}
                  disabled={!prompt.trim()}
                  className="rounded-full px-6 button-transition bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;