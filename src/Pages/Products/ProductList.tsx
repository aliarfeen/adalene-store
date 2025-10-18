
/* 1-display data
    1.1-fetch data using react query done
    1.2-map data done
    1.3-polish card 
    1.4-enhance functionalities 
   2-filter data
*/

import { useState } from "react"
import ProductsFilter from "../../Components/Products/ProductsFilter"
import ProductsList from "../../Components/Products/ProductsList"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../App/store"

const ProductListPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    colors: [] as string[],
    sizes: [] as string[],
  })
  
     const items = useSelector((s: RootState) => s.product.items);
     console.log(items);
     
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold font-sans text-center my-7 text-stone-800">
          All Products
        </h1>
      </div>
      <div className="flex">
        <ProductsFilter
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
     
        <ProductsList activeFilters={activeFilters} searchQuery={searchQuery} />
      </div>
    </>
  )
}

export default ProductListPage
