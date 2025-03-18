
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Changelog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Tutorials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Terms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Cookies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <Link to="/" className="text-xl font-display font-bold tracking-tight mb-4 md:mb-0">
            <span className="text-gradient">Friend</span>
          </Link>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Friend. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
