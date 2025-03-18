
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Features', href: '#features' },
    { title: 'Testimonials', href: '#testimonials' },
    { title: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-display font-bold tracking-tight animate-fade-in"
          >
            <span className="text-gradient">Friend</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all hover:text-primary link-underline',
                  'animate-fade-in',
                  { 'animation-delay-100': index === 1, 'animation-delay-200': index === 2 }
                )}
              >
                {item.title}
              </a>
            ))}
            <Button className="button-transition animate-fade-in">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-white z-40 p-6 transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        )}
      >
        <div className="flex flex-col space-y-6 mt-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </a>
          ))}
          <Button className="w-full button-transition">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
