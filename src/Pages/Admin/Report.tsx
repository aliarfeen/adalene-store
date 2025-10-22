import React, { useMemo, useState } from "react";
import Table from "../../Components/Table/Table";
import type { Product } from "../../Types/";
import useProducts from "../../hooks/useProducts";
import Pagination from "../../Components/Products/Pagination"; 

interface ProductPerformance extends Product {
  productRevenue: number;
  avgPrice: number;
  avgQuantity: number;
}

const Report: React.FC = () => {
  const { products = [], isLoading, isError } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

 
  const tableData: ProductPerformance[] = useMemo(() => {
    return products.map((product) => {
      const cost = product.cost ?? 0;
      const productRevenue = (product.price - cost - 0.08) * product.quantity;
      const avgPrice = product.quantity > 0 ? productRevenue / product.quantity : 0;
      const avgQuantity = product.quantity;
      return { ...product, productRevenue, avgPrice, avgQuantity };
    });
  }, [products]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tableData.slice(startIndex, endIndex);
  }, [tableData, currentPage]);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  const columns = [
    { key: "title", header: "Product" },
    { key: "quantity", header: "Quantity" },
    {
      key: "productRevenue",
      header: "Product Revenue",
      render: (item: ProductPerformance) => `$${item.productRevenue.toFixed(2)}`,
    },
    {
      key: "avgPrice",
      header: "Average Price",
      render: (item: ProductPerformance) => `$${item.avgPrice.toFixed(2)}`,
    },
    {
      key: "avgQuantity",
      header: "Average Quantity",
      render: (item: ProductPerformance) => item.avgQuantity.toFixed(2),
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-brown-600 mb-4 flex items-center gap-2">
        Product Performance
      </h2>

      <Table<ProductPerformance> data={paginatedData} columns={columns} />
      <Pagination
        totalitems={tableData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Report;
