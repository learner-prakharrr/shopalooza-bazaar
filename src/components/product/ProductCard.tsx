
import React from 'react';
import { Link } from 'react-router-dom';
import { useImageLoad } from '@/hooks/use-image-load';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isLoaded = useImageLoad(product.image);
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };
  
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="product-card group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
    >
      <div className="aspect-square overflow-hidden relative">
        <div className={cn(
          "w-full h-full absolute top-0 left-0 bg-gray-100",
          isLoaded ? "opacity-0" : "opacity-100"
        )} />
        <img 
          src={product.image} 
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
            "image-fade-in",
            isLoaded ? "loaded" : ""
          )}
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
          <Button 
            onClick={handleAddToCart} 
            size="sm" 
            className="w-full transition-all"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-medium text-sm sm:text-base">{product.name}</h3>
        <p className="font-semibold mt-1">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
