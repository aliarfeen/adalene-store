import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import apiFactory from "../../../Api/apiFactory";
import type { Product } from "../../../Types";
import CountUpNumber from "../../../Components/UI/CountUpNumber";    

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChartPage: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [categoriesInfo, setCategoriesInfo] = useState<
    { name: string; value: number; percentage: string; color: string }[]
  >([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const products = await apiFactory.fetchProducts();
        const categoryQuantity: Record<string, number> = {};
        products.forEach((product: Product) => {
          const category = product.category || "Uncategorized";
          const qty = Number(product.quantity) || 0;
          categoryQuantity[category] = (categoryQuantity[category] || 0) + qty;
        });

        const categories = Object.keys(categoryQuantity);
        const quantities = Object.values(categoryQuantity);
        const total = quantities.reduce((a, b) => a + b, 0) || 1;

        const colors = ["#D7CCC8", "#A1887F", "#8D6E63", "#6D4C41", "#5D4037", "#3E2723"];

        setChartData({
          labels: categories,
          datasets: [
            {
              data: quantities,
              backgroundColor: colors.slice(0, categories.length),
              hoverOffset: 6,
            },
          ],
        });

        const info = categories.map((cat, i) => ({
          name: cat,
          value: quantities[i],
          percentage: ((quantities[i] / total) * 100).toFixed(1) + "%",
          color: colors[i % colors.length],
        }));

        setCategoriesInfo(info);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <section className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <h3 className="text-lg font-semibold text-brownText">
          Product <span className="text-brownDark">Category Overview</span>
        </h3>
        <p className="text-sm text-brownAccent">Visual breakdown of quantities</p>
      </motion.div>

   <motion.div
  className="max-w-xs mx-auto bg-white rounded-2xl shadow-soft p-4 flex justify-center items-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
style={{ minHeight: "260px" }}  
>
  {chartData ? (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 25, 
        ease: "linear",
      }}
      className="flex justify-center items-center"
      style={{ width: "200px", height: "200px" }} 
    >
      <Doughnut
        data={chartData}
        options={{
          cutout: "65%",
          plugins: { legend: { display: false }, tooltip: { enabled: true } },
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 2000,
            easing: "easeOutCubic",
          },
        }}
      />
    </motion.div>
  ) : (
    <p className="text-center text-brownAccent text-sm">Loading chart...</p>
  )}
</motion.div>


      <motion.div
        className="max-w-xs mx-auto mt-4 flex flex-col gap-2 px-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {categoriesInfo.map((cat, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-lg shadow-soft py-2 px-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-brownText truncate">{cat.name}</span>
            </div>

            <span className="text-brownDark font-semibold">
              <CountUpNumber value={parseFloat(cat.percentage)} duration={1.5} />%
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryChartPage;
