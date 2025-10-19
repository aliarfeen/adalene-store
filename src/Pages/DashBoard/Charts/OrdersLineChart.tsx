import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title } from "chart.js";
import apiFactory from "../../../Api/apiFactory";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

const OrdersLineChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await apiFactory.fetchOrders();
      const grouped = orders.reduce((acc: any, order: any) => {
        const date = new Date(order.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      setLabels(Object.keys(grouped));
      setData(Object.values(grouped));
    };
    fetchOrders();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data,
        fill: false,
        borderColor: "#6D4C41",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white/90 border border-[#EADFD7] shadow rounded-2xl p-5">
      <h3 className="text-[#4E342E] font-semibold mb-3">Orders Over Time</h3>
      <Line data={chartData} />
    </div>
  );
};

export default OrdersLineChart;
