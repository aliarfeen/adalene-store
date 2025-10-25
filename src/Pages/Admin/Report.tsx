import React, { useMemo, useRef, useState } from "react";
import Table from "../../Components/Table/Table";
import type { Product } from "../../Types/";
import useProducts from "../../hooks/useProducts";
import Pagination from "../../Components/Products/Pagination";
import { Button } from "../../Components/Common/Button";


interface ProductPerformance extends Product {
  productRevenue: number;
  avgPrice: number;
  tax: number;

}

const Report: React.FC = () => {
  const { products = [], isLoading, isError } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = componentRef.current;
    const WindowPrint = window.open("", "", "width=900,height=650");
    if (WindowPrint && printContent) {
      WindowPrint.document.write(`
        <html>
          <head>
            <title>Report</title>
            <style>
              body { font-family: Arial; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      WindowPrint.document.close();
      WindowPrint.print();
    }
  };

  const tableData: ProductPerformance[] = useMemo(() => {
    return products.map((product) => {
      const cost = product.cost ?? 0;
      const productRevenue = (product.price - cost - 0.08*product.price) * product.quantity;
      const avgPrice = product.quantity > 0 ? productRevenue / product.quantity : 0;
      const price = product.price;
      const tax = product.price*.08;

      return { ...product, productRevenue, avgPrice, price, tax };
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
    { key: "price", header: "Price" },
    {
      key: "Cost",
      header: "Cost",
      render: (item: ProductPerformance) => item.cost ?`${item.cost.toFixed(2)}EGP` : "N/A",
    
    },
  {
  key: "tax",
  header: "Tax",
  render: (item: ProductPerformance) => `${item.tax.toFixed(2)}EGP`,
},
    {
      key: "productRevenue",
      header: "Product Revenue",
      render: (item: ProductPerformance) => `${item.productRevenue.toFixed(2)}EGP`,
    },

  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-brown-600 mb-4 flex items-center gap-2">
        Product Performance
      </h2>
      <Button text="Print Report" onClick={handlePrint} className="m-4" />
      <div ref={componentRef}>
        <Table<ProductPerformance> data={paginatedData} columns={columns} />
      </div>

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
