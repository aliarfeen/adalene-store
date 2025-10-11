import { useState } from 'react';
import ProductsFilter from '../../Components/Products/ProductsFilter'
import ProductsList from '../../Components/Products/ProductsList'


/* 1-display data
    1.1-fetch data using react query done
    1.2-map data done
    1.3-polish card 
    1.4-enhance functionalities 
   2-filter data
*/
const ProductListPage = () => {
   const [activeFilters, setActiveFilters] = useState({
    category: "",
    colors: [] as string[],
    sizes: [] as string[],
  })
  return (
    <>
    <div>
      <h1 className='text-5xl font-bold font-sans text-center my-7 text-stone-800'>All Products</h1>
    </div>
    <div className='flex'>
      <ProductsFilter 
      activeFilters={activeFilters}
      onFilterChange={setActiveFilters}
      />
      <ProductsList activeFilters={activeFilters} />
    </div>
    </>
    
  )
}

export default ProductListPage
