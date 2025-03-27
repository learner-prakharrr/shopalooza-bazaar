
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fade-in max-w-md px-4">
        <h1 className="text-9xl font-display font-bold text-primary">404</h1>
        <h2 className="text-2xl font-medium">Page not found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate('/')}>
            Return Home
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
