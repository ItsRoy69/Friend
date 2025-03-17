
import React from 'react';
import { cn } from '@/lib/utils';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Code, Layout, Paintbrush, Rocket, Zap, Bot } from 'lucide-react';

const featureItems = [
  {
    title: 'AI-Powered',
    description: 'Let our AI understand your needs and generate code in seconds.',
    icon: <Bot className="h-6 w-6 text-blue-500" />
  },
  {
    title: 'Beautiful UI',
    description: 'Professionally designed components that look great out of the box.',
    icon: <Paintbrush className="h-6 w-6 text-indigo-500" />
  },
  {
    title: 'Responsive',
    description: 'All created websites work perfectly on any device, from mobile to desktop.',
    icon: <Layout className="h-6 w-6 text-purple-500" />
  },
  {
    title: 'Developer Friendly',
    description: 'Clean code that follows best practices for easy customization.',
    icon: <Code className="h-6 w-6 text-pink-500" />
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized for performance to ensure your site loads quickly.',
    icon: <Zap className="h-6 w-6 text-yellow-500" />
  },
  {
    title: 'Deploy Instantly',
    description: 'Go live with one click and share your creation with the world.',
    icon: <Rocket className="h-6 w-6 text-red-500" />
  }
];

const FeatureCard = ({ item, index }: { item: typeof featureItems[0], index: number }) => {
  return (
    <div 
      className="animate-blur-in" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <GlassMorphism className="h-full card-hover">
        <div className="flex flex-col h-full">
          <div className="mb-5 p-3 rounded-lg inline-block bg-gray-50">
            {item.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
      </GlassMorphism>
    </div>
  );
};

const Features = () => {
  return (
    <section 
      id="features" 
      className="py-24 relative"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium text-blue-600">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything you need to build exceptional websites
          </h2>
          <p className="text-muted-foreground">
            Our platform combines AI intelligence with beautiful components to help you build better websites faster.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((item, index) => (
            <FeatureCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
