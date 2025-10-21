import React, { useEffect, useState } from "react";
import { Users, Package, ShoppingBag,  TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import apiFactory from "../../../Api/apiFactory";
import CountUpNumber from "../../../Components/UI/CountUpNumber";

interface DashboardStats {
  users: number;
  products: number;
  orders: number;
  revenue: number;
}

const Ourgrowingstats: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await apiFactory.fetchUsers();
        const products = await apiFactory.fetchAllProducts("products");
        const orders = await apiFactory.fetchOrders();

        const totalRevenue =
          orders?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) ?? 0;

        setStats({
          users: users?.length ?? 0,
          products: products?.length ?? 0,
          orders: orders?.length ?? 0,
          revenue: totalRevenue,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      icon: <Users className="w-8 h-8 text-[#6D4C41]" />,
      label: "Active Clients",
      value: stats.users,
      suffix: "+",
    },
    {
      icon: <Package className="w-8 h-8 text-[#6D4C41]" />,
      label: "Total Products",
      value: stats.products,
      suffix: "+",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-[#6D4C41]" />,
      label: "Total Orders",
      value: stats.orders,
      suffix: "+",
    },
    {
  icon: <TrendingUp className="w-8 h-8 text-[#6D4C41]" />,
  label: "Total Revenue",
  value: stats.revenue,
  isMoney: true,
},
  ];

  return (
    <section className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#4E342E] mb-2">
          Our <span className="text-[#6D4C41]">Growing Stats</span>
        </h2>
        <p className="text-sm text-[#8D6E63]">
          Real-time insights that show our platform’s progress
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/90 border border-[#F0E6DF] shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-300"
          >
            <div className="mb-3">{card.icon}</div>

            <h3 className="text-3xl font-extrabold text-[#4E342E] mb-1">
              {card.isMoney ? (
                <>
                  $<CountUpNumber value={card.value} duration={1.8} />
                </>
              ) : (
                <>
                  <CountUpNumber value={card.value} duration={1.5} />
                  {card.suffix}
                </>
              )}
            </h3>

            <p className="text-sm font-medium text-[#8D6E63]">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Ourgrowingstats;
