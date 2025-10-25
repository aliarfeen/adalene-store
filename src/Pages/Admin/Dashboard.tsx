import React from "react";
import Ourgrowingstats from "../DashBoard/Charts/Ourgrowingstats";
import CategoryChartPage from "../DashBoard/Charts/CategoryChartPage";
import TopFivePage from "../DashBoard/Charts/TopFiveProduct";
import RevenueChart from "../DashBoard/Charts/RevenueChart";
import OrdersLineChart from "../DashBoard/Charts/OrdersLineChart";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen text-[#4E342E] p-6 md:p-10">
      {/* Top Stats */}
      <div className="mb-10">
        <Ourgrowingstats />
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side (Revenue + Orders + Top Products) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300">
            <RevenueChart />
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300">
            <OrdersLineChart />
          </div>

          {/* ⬇️ Move TopFivePage here and give it more width */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300">
            <TopFivePage />
          </div>
        </div>

        {/* Right Side (Category Chart only) */}
        <div className="flex flex-col gap-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300">
            <CategoryChartPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
