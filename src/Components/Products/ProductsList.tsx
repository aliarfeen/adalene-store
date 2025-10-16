// import { useState } from "react"
// import type { Product } from "../../Types"
// import Pagination from "./Pagination"
// import ProductCard from "./ProductCard"
// import { useQuery } from "@tanstack/react-query"
// import apiFactory from "../../Api/apiFactory"
// import useProducts from "../../hooks/useProducts"

// interface ProductsListProps {
//   activeFilters: {
//     category: string
//   }
// }

// const ProductsList = ({ activeFilters }: ProductsListProps) => {
//   // const query = useQuery({
//   //   queryKey: ["products"],
//   //   queryFn: apiFactory.fetchProducts,
//   //   staleTime: 1000 * 60 * 2,
//   // })

//   const data = useProducts()

//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(9)

//   //filter
//   const filteredProducts = (data.products ?? []).filter(product  => {
//     const matchesCategory =
//       !activeFilters.category || 
//       product.category?.toLowerCase() === activeFilters.category.toLowerCase()

    
//     return matchesCategory 
//   })

//   const lastIndex = currentPage * itemsPerPage
//   const firstIndex = lastIndex - itemsPerPage
//   const currentItems = filteredProducts.slice(firstIndex, lastIndex)

//   return (
//     <div className="flex flex-col self-center">
//       <p className="text-gray-500 font-medium text-start p-7">
//         ({filteredProducts.length}) Products
//       </p>
//       <div className="grid grid-cols-1 gap-4 self-center md:grid-cols-2 xl:grid-cols-3">
//         {currentItems.map((product:Product, index:number) => (
//           <ProductCard key={index} product={product} />
//         ))}
//       </div>
//       <Pagination
//         totalitems={filteredProducts.length ?? 0}
//         itemsPerPage={itemsPerPage}
//         setCurrentPage={setCurrentPage}
//         currentPage={currentPage}
//       />
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import type { Product } from "../../Types"
import Pagination from "./Pagination"
import ProductCard from "./ProductCard"
import useProducts from "../../hooks/useProducts"

interface ProductsListProps {
  activeFilters: {
    category: string
  }
  searchQuery?: string
}

const ProductsList = ({ activeFilters, searchQuery = "" }: ProductsListProps) => {
  const { products = [] } = useProducts()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)

  
  useEffect(()=>{
    
  const timeout = setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 100);
    return () => clearTimeout(timeout);
  },[currentPage])


  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory =
      !activeFilters.category ||
      product.category?.toLowerCase() === activeFilters.category.toLowerCase()

    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })


  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentItems = filteredProducts.slice(firstIndex, lastIndex)

  return (
    <div className="flex flex-col self-center w-full">
      <p className="text-gray-500 font-medium text-start p-7">
        ({filteredProducts.length}) Products
      </p>

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
  )
}

export default ProductsList
