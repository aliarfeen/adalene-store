
import React, { useEffect, useState } from "react";
import apiFactory from "../../../Api/apiFactory";
import type { Product } from "../../../Types";

const TopFivePage: React.FC = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopFive = async () => {
      try {
        const products = await apiFactory.fetchProducts();

        const sorted = [...products]
          .filter((p) => typeof p.orderQuantity === "number")
          .sort((a, b) => (b.orderQuantity ?? 0) - (a.orderQuantity ?? 0));

        setTopProducts(sorted.slice(0, 5));
      } catch (err) {
        console.error("Error fetching top products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopFive();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-brownDark">
        Loading Top 5 Products...
      </div>
    );

  return (
    <div>
      <h3 className="text-lg font-semibold text-brownText mb-4">Top 5 Most Ordered</h3>
      {topProducts.length === 0 ? (
        <p className="text-sm text-brownAccent">No products available.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 border border-transparent rounded-lg shadow-soft bg-white"
            >
              <span className="text-sm font-bold text-brownDark">#{index + 1}</span>
              <img
                src={product.image}
                alt={product.title}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-brownText">{product.title}</p>
                <p className="text-xs text-brownAccent">Ordered: {product.orderQuantity ?? 0} times</p>
              </div>
              <p className="text-sm font-semibold text-brownDark">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopFivePage;
