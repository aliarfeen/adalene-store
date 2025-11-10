import React, { useEffect, useState } from "react";
import type { Product } from "../../Types/Product";
import ProductCard from "../../Components/Products/ProductCard";
import ScrollToTop from "../../Components/Common/ScrollToTop";
import Pagination from "../../Components/Products/Pagination"; 
import { Helmet } from 'react-helmet';

const Wishlist: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
    if (loggedUser && Array.isArray(loggedUser.favourites)) {
      setFavorites(loggedUser.favourites);
    } else {
      setFavorites([]);
    }
  }, []);


  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = favorites.slice(firstItemIndex, lastItemIndex);

  return (
    <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>
      <ScrollToTop />
      <div className="max-w-6xl mx-auto bg-white m-1 shadow-sm p-6">
        {favorites.length === 0 ? (
          <p className="text-center text-[#6b4a33] text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <>
            <div
              className="grid gap-8
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        justify-items-center"
            >
              {currentItems.map((product) => (
                <div
                  key={product.id}
                  className="w-full max-w-sm bg-[#fffdfa] border border-[#f0e6df] rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                totalitems={favorites.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
