
import { useState, useEffect } from 'react';

export function useImageLoad(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!src) return;
    
    setIsLoaded(false);
    
    const image = new Image();
    image.src = src;
    
    image.onload = () => {
      setIsLoaded(true);
    };
    
    return () => {
      image.onload = null;
    };
  }, [src]);
  
  return isLoaded;
}
