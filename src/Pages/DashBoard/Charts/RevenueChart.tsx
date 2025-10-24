import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from "chart.js";
import apiFactory from "../../../Api/apiFactory";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const RevenueChart: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await apiFactory.fetchResource("Order");
        const grouped = orders.reduce((acc: any, order: any) => {
          const month = new Date(order.date).toLocaleString("default", { month: "short" });
          acc[month] = (acc[month] || 0) + order.total;
          return acc;
        }, {});
        setLabels(Object.keys(grouped));
        setData(Object.values(grouped));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        backgroundColor: "#6C3F31",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { color: "#5D4037" } },
    },
  };

  return (
    <div className="bg-white/90 border border-[#EADFD7] shadow rounded-2xl p-5">
      <h3 className="text-[#4E342E] font-semibold mb-3">Monthly Revenue</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
