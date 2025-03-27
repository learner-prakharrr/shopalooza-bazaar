
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">Essence</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Premium products crafted with care, designed for those who appreciate quality and simplicity.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories/featured" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/categories/new-arrivals" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/categories/best-sellers" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-6">About</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-6">Newsletter</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and new product announcements.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-l-md text-sm focus:outline-none focus:border-primary-foreground/40"
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Essence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
