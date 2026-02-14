import { motion, type Variants } from "framer-motion"
import {
  Shield,
  Users,
  Store,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Settings,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { stores, revenueData } from "../data/mockData"

/* ---------------- ANIMATIONS ---------------- */

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

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

/* ---------------- DATA ---------------- */

const adminStats = [
  { label: "Total GMV", value: "$80M", change: "+18.2%", icon: DollarSign },
  { label: "Commission Revenue", value: "$4.8M", change: "+15.4%", icon: TrendingUp },
  { label: "Active Retailers", value: "18,750", change: "+1,240", icon: Store },
  { label: "Global Customers", value: "8.4M", change: "+620K", icon: Users },
]

const subscriptionBreakdown = [
  { name: "Basic ($29)", value: 8450, color: "#818cf8" },
  { name: "Growth ($79)", value: 7200, color: "#d946ef" },
  { name: "Enterprise", value: 3100, color: "#f59e0b" },
]

const kycQueue = [
  { store: "FreshMart Lagos", country: "Nigeria", status: "pending", date: "2026-02-14" },
  { store: "SilkRoad Dubai", country: "UAE", status: "pending", date: "2026-02-13" },
  { store: "NordCraft Oslo", country: "Norway", status: "review", date: "2026-02-13" },
  { store: "TechBay Singapore", country: "Singapore", status: "approved", date: "2026-02-12" },
  { store: "ArtCorner Paris", country: "France", status: "rejected", date: "2026-02-12" },
]

/* ---------------- COMPONENT ---------------- */

export default function AdminPanel() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary-400" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-slate-800 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alerts
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {adminStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-slate-900 p-6 rounded-xl"
            >
              <div className="flex justify-between mb-4">
                <stat.icon className="w-5 h-5 text-primary-400" />
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs opacity-60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue Chart */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">Platform Revenue</h3>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip
                  formatter={(value: number | undefined, name: string) => {
                    if (typeof value !== "number") return ["$0", name]
                    return [
                      `$${value.toLocaleString()}`,
                      name === "commission"
                        ? "Commission"
                        : "Subscriptions",
                    ]
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#d946ef"
                  fill="#d946ef"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Subscription Breakdown */}
          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">Subscription Plans</h3>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={subscriptionBreakdown}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={75}
                >
                  {subscriptionBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KYC Queue */}
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">KYC Queue</h3>

            <div className="space-y-3">
              {kycQueue.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-slate-800 p-3 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{item.store}</div>
                    <div className="text-xs opacity-60">
                      {item.country} • {item.date}
                    </div>
                  </div>

                  {item.status === "approved" && (
                    <CheckCircle2 className="text-green-400 w-4 h-4" />
                  )}
                  {item.status === "rejected" && (
                    <XCircle className="text-red-400 w-4 h-4" />
                  )}
                  {item.status === "review" && (
                    <Eye className="text-blue-400 w-4 h-4" />
                  )}
                  {item.status === "pending" && (
                    <Clock className="text-amber-400 w-4 h-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top Stores */}
          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">Top Retailers</h3>

            <div className="space-y-3">
              {stores.slice(0, 5).map((store, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-slate-800 p-3 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{store.name}</div>
                    <div className="text-xs opacity-60">
                      {store.country}
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${store.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

