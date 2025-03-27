
import React from 'react';
import { useImageLoad } from '@/hooks/use-image-load';
import { cn } from '@/lib/utils';

interface ImageWithLoadingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ImageWithLoading = ({ 
  src, 
  alt, 
  className,
  containerClassName,
  ...props 
}: ImageWithLoadingProps) => {
  const isLoaded = useImageLoad(src);
  
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div className={cn(
        "absolute inset-0 bg-gray-100",
        isLoaded ? "animate-fade-out" : "opacity-100"
      )} />
      <img 
        src={src} 
        alt={alt} 
        className={cn(
          "image-fade-in",
          isLoaded ? "loaded" : "",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoading;
