
import React, { useState } from 'react';
import { Check, Sliders, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import ProductGrid from '@/components/product/ProductGrid';
import { allProducts } from '@/data/products';

const ProductsPage = () => {
  const [products, setProducts] = useState(allProducts);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
    sort: 'featured' as 'featured' | 'price-asc' | 'price-desc' | 'newest',
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, category] };
      } else {
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      }
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] as [number, number] }));
  };
  
  const handleSortChange = (sort: typeof filters.sort) => {
    setFilters(prev => ({ ...prev, sort }));
  };
  
  const applyFilters = () => {
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(p => filters.categories.includes(p.category));
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you would sort by date
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Featured is default, no need to sort
        break;
    }
    
    setProducts(filteredProducts);
    setIsMobileFiltersOpen(false);
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      sort: 'featured',
    });
    setProducts(allProducts);
  };
  
  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
              />
              <label 
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]} 
            max={1000} 
            step={10}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-muted-foreground">${filters.priceRange[0]}</span>
            <span className="text-sm text-muted-foreground">${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'featured', label: 'Featured' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest' },
          ].map(option => (
            <div 
              key={option.value} 
              className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between ${
                filters.sort === option.value ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
              }`}
              onClick={() => handleSortChange(option.value as any)}
            >
              <span className="text-sm">{option.label}</span>
              {filters.sort === option.value && <Check className="h-4 w-4" />}
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 space-y-2">
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">All Products</h1>
          
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center md:hidden">
                <Sliders className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your product search with filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-64 shrink-0">
            <FilterPanel />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {products.length} products
              </p>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <select 
                  className="text-sm border rounded-md p-1"
                  value={filters.sort}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            <ProductGrid products={products} columns={3} />
            
            {products.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search term
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
