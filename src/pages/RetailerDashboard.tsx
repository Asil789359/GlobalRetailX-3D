import { motion } from "framer-motion";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Plus,
  Settings,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Upload,
  Layers,
  Edit3,
  Trash2,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { products, recentOrders } from "../data/mockData";

/* ---------------- TYPES ---------------- */

interface MonthlyRevenue {
  month: string;
  revenue: number;
  commission: number;
  orders: number;
}

/* ---------------- ANIMATIONS ---------------- */

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ---------------- DATA ---------------- */

const dashboardStats = [
  {
    label: "Total Revenue",
    value: "$156,780",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    gradient: "from-primary-500 to-primary-600",
  },
  {
    label: "Orders",
    value: "2,847",
    change: "+8.3%",
    up: true,
    icon: ShoppingCart,
    gradient: "from-accent-500 to-accent-600",
  },
  {
    label: "Products",
    value: "245",
    change: "+3",
    up: true,
    icon: Package,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    label: "Avg. Rating",
    value: "4.8",
    change: "+0.2",
    up: true,
    icon: Star,
    gradient: "from-amber-500 to-orange-600",
  },
];

const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Aug", revenue: 18500, commission: 1110, orders: 145 },
  { month: "Sep", revenue: 22300, commission: 1338, orders: 178 },
  { month: "Oct", revenue: 19800, commission: 1188, orders: 156 },
  { month: "Nov", revenue: 28400, commission: 1704, orders: 223 },
  { month: "Dec", revenue: 35200, commission: 2112, orders: 289 },
  { month: "Jan", revenue: 31000, commission: 1860, orders: 256 },
  { month: "Feb", revenue: 33500, commission: 2010, orders: 278 },
];

/* ---------------- COMPONENT ---------------- */

export default function RetailerDashboard() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              <span className="text-white">Retailer </span>
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-surface-200/50">
              Welcome back • Enterprise Plan
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium hover:bg-white/5">
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-medium">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {dashboardStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>

                <div
                  className={`flex items-center gap-1 text-xs ${
                    stat.up ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>

              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-surface-200/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue Chart */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Revenue Overview
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tickFormatter={(v: number) => `$${v / 1000}k`}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === "revenue" ? "Revenue" : "Commission",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="commission"
                stroke="#d946ef"
                fill="#d946ef"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Products */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Your Products
            </h3>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500/10 text-primary-400 text-sm">
              <Upload className="w-4 h-4" />
              Upload 3D Model
            </button>
          </div>

          <table className="w-full">
            <tbody>
              {products.slice(0, 5).map((product, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 text-white">{product.name}</td>
                  <td className="py-3 text-white font-semibold">
                    ${product.price}
                  </td>
                  <td className="py-3 text-white">{product.stock}</td>
                  <td className="py-3 text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {product.rating}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Eye className="w-4 h-4 text-surface-200/40" />
                      <Edit3 className="w-4 h-4 text-surface-200/40" />
                      <Trash2 className="w-4 h-4 text-red-400/40" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orders */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Orders
          </h3>

          <table className="w-full">
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 text-primary-400">{order.id}</td>
                  <td className="py-3 text-white">{order.customer}</td>
                  <td className="py-3 text-white">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-3 text-accent-400">
                    -${order.commission.toFixed(2)}
                  </td>
                  <td className="py-3 text-white font-semibold">
                    ${order.retailerAmount.toFixed(2)}
                  </td>
                  <td className="py-3 text-white capitalize">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

