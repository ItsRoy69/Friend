
import React from 'react';
import { cn } from '@/lib/utils';
import GlassMorphism from '@/components/ui/GlassMorphism';

const testimonials = [
  {
    quote: "This platform has completely transformed how I build websites. What used to take days now takes hours.",
    author: "Alex Morgan",
    role: "Product Designer"
  },
  {
    quote: "The AI understands exactly what I need, and the code quality is outstanding. Absolutely game-changing.",
    author: "Sarah Chen",
    role: "Frontend Developer"
  },
  {
    quote: "I've tried many website builders, but this one stands out for its beautiful design and ease of use.",
    author: "Michael Johnson",
    role: "Marketing Director"
  },
  {
    quote: "As a non-technical founder, this tool has saved me thousands of dollars in development costs.",
    author: "Jamie Williams",
    role: "Startup Founder"
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  return (
    <div 
      className="animate-fade-in" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <GlassMorphism className="h-full card-hover">
        <div className="flex flex-col h-full">
          <div className="mb-4 text-xl text-foreground/90">"{testimonial.quote}"</div>
          <div className="mt-auto">
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </GlassMorphism>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section 
      id="testimonials" 
      className="py-24 relative bg-gradient-to-b from-secondary/50 to-background"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium text-blue-600">What People Say</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Loved by designers and developers
          </h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied users who are building amazing websites with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
