
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from '@/components/ui/GlassMorphism';
import AnimatedGradient from '@/components/ui/AnimatedGradient';

const CallToAction = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <AnimatedGradient className="opacity-30" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <GlassMorphism className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-slide-up">
              Start building your dream website today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Join thousands of creators and businesses who are building exceptional websites with our platform.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-white p-8 rounded-xl shadow-subtle">
                <div className="text-sm font-medium text-blue-600 mb-2">Free</div>
                <h3 className="text-2xl font-bold mb-2">$0</h3>
                <p className="text-muted-foreground text-sm mb-6">Perfect for trying out</p>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic components
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 3 projects
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Community support
                  </li>
                </ul>
                <Button variant="outline" className="w-full button-transition">
                  Get Started
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-subtle border-2 border-primary/10">
                <div className="text-sm font-medium text-blue-600 mb-2">Pro</div>
                <h3 className="text-2xl font-bold mb-2">$19</h3>
                <p className="text-muted-foreground text-sm mb-6">Perfect for professionals</p>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All components
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom domain
                  </li>
                </ul>
                <Button className="w-full button-transition">
                  Upgrade to Pro
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '300ms' }}>
              All plans come with a 14-day money-back guarantee
            </p>
          </GlassMorphism>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
