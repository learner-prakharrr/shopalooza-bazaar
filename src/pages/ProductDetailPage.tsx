
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Star, 
  Truck,
  Shield,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ImageWithLoading from '@/components/ui/ImageWithLoading';
import ProductGrid from '@/components/product/ProductGrid';
import { useCart } from '@/hooks/use-cart';
import { allProducts } from '@/data/products';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const product = allProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the product you're looking for.
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    });
  };
  
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/products')}>Products</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate(`/categories/${product.category}`)}>
            {product.category}
          </span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden">
            <ImageWithLoading 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto aspect-square object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="animate-fade-in">
            <span className="inline-block bg-primary/10 text-primary text-sm rounded-full px-3 py-1 mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-sm">(24 reviews)</span>
            </div>
            
            <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
            
            <p className="text-muted-foreground mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border border-input rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                className="flex-1 h-12"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-12"
              >
                Buy Now
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On all orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-muted-foreground">Satisfaction guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b rounded-none space-x-8 bg-transparent h-auto pb-4">
            <TabsTrigger value="description" className="text-base rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="text-base rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-base rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Reviews (24)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Designed for everyday use</li>
                <li>Sleek and modern aesthetic</li>
                <li>Durable construction</li>
                <li>Easy to clean and maintain</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Material</span>
                    <span>Premium Material</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>10 x 8 x 2 inches</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Weight</span>
                    <span>1.5 lbs</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Color</span>
                    <span>Multiple Options</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Warranty</span>
                    <span>1 Year</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">What's Included</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Main Product</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>User Manual</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Warranty Card</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Product Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Jane Doe</h4>
                      <span className="text-sm text-muted-foreground">2 weeks ago</span>
                    </div>
                    <div className="flex mb-3">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm">
                      Great product! Exceeded my expectations in terms of quality and design. Would definitely recommend.
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline">
                  Load More Reviews
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">You May Also Like</h2>
              <p className="text-muted-foreground">Products similar to this one</p>
            </div>
            <Button variant="link" className="flex items-center" asChild>
              <a href="/products">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
