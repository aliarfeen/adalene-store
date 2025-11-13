/* 1-display data
    1.1-fetch data using react query done
    1.2-map data done
    1.3-polish card 
    1.4-enhance functionalities 
   2-filter data
*/

import { useState } from "react";
import ProductsFilter from "../../Components/Products/ProductsFilter";
import ProductsList from "../../Components/Products/ProductsList";
import { useLocation, useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { Helmet } from "react-helmet";

const ProductListPage = () => {
  const location = useLocation();
  const category = location.state?.category || "";
  const { products, isError } = useProducts();

  const prices = products.map((product) => product.price);
  const price = Math.max(...prices);

  const [activeFilters, setActiveFilters] = useState({
    category,
    price,
  });

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <>
      <Helmet>
        <title>Products List</title>
      </Helmet>
      <div>
        <h1 className="text-5xl font-bold font-sans text-center my-7 text-stone-800">
          All Products
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row">
        <ProductsFilter
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />

        <ProductsList
          activeFilters={activeFilters}
          searchQuery={searchQuery}
          products={products}
          isLoading={true}
          isError={isError}
        />
      </div>
    </>
  );
};

export default ProductListPage;
