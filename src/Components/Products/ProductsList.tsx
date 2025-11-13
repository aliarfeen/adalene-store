import { useEffect, useState } from "react";
import type { Product } from "../../Types";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductsListProps {
  activeFilters: {
    category: string;
    price: number;
  };
  searchQuery?: string;
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const ProductsList = ({
  activeFilters,
  searchQuery = "",
  products,
  isLoading,
  isError,
}: ProductsListProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory =
      !activeFilters.category ||
      product.category?.toLowerCase() === activeFilters.category.toLowerCase();

    const matchesPrice =
      !activeFilters.price || product.price <= activeFilters.price;

    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredProducts.slice(firstIndex, lastIndex);

  return (
    <div className="flex flex-col self-center w-full">
      <p className="text-gray-500 font-medium text-start p-7">
        ({filteredProducts.length}) Products
      </p>
      {isLoading ??  
        <div className="grid grid-cols-1 gap-4 self-center md:grid-cols-2 xl:grid-cols-3">
          {elements.map((index) => < ProductCardSkeleton key={index} />)}
        </div>}
        {
          isError ?? <p className="text-gray-500 font-medium text-start p-7">Something went wrong</p>
        }
        <div className="grid grid-cols-1 gap-4 self-center md:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((product: Product, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      
      <Pagination
        totalitems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsList;
