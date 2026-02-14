import { motion, type Variants } from "framer-motion"
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
  Edit3,
  Trash2,
} from "lucide-react"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { products, recentOrders } from "../data/mockData"

interface MonthlyRevenue {
  month: string
  revenue: number
  commission: number
  orders: number
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Aug", revenue: 18500, commission: 1110, orders: 145 },
  { month: "Sep", revenue: 22300, commission: 1338, orders: 178 },
  { month: "Oct", revenue: 19800, commission: 1188, orders: 156 },
  { month: "Nov", revenue: 28400, commission: 1704, orders: 223 },
  { month: "Dec", revenue: 35200, commission: 2112, orders: 289 },
]

export default function RetailerDashboard() {
  return (
    <div className="p-8 min-h-screen">
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-3xl font-bold mb-8"
      >
        Retailer Dashboard
      </motion.h1>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v: number) => `$${v / 1000}k`} />
            <Tooltip
              formatter={(value: number | undefined, name: string) => {
                if (typeof value !== "number") return ["$0", name]
                return [
                  `$${value.toLocaleString()}`,
                  name === "revenue" ? "Revenue" : "Commission",
                ]
              }}
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

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full">
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i} className="border-b border-slate-700">
                <td className="py-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total.toFixed(2)}</td>
                <td className="text-pink-400">
                  -${order.commission.toFixed(2)}
                </td>
                <td className="font-semibold">
                  ${order.retailerAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

