import { createContext, useState, useEffect } from "react";

interface ProductContextType {
  product: any; // Replace 'any' with your actual Product type
  setproduct: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your actual Product type
}
export type { ProductContextType };

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {

  const [product, setproduct] = useState(null);
 
  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("product");
    if (saved) {
      setproduct(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever product changes
  useEffect(() => {
    if (product) {
      localStorage.setItem("product", JSON.stringify(product));
    }
  }, [product]);

  return (
    <ProductContext.Provider value={{ product, setproduct }}>
      {children}
    </ProductContext.Provider>
  );
}
