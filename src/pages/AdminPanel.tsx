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
  Shield, Users, Store, DollarSign, TrendingUp, AlertTriangle,
  Globe, Settings, BarChart3, ArrowUpRight, FileCheck, UserCheck,
  Ban, Eye, CheckCircle2, Clock, XCircle
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { stores, revenueData, globalStats } from '../data/mockData'

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

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold font-[Outfit] text-white">Platform Revenue</h3>
                <p className="text-xs text-surface-200/40">Commission + Subscription Revenue</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-surface-200/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  Commission
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-500" />
                  Subscriptions
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="adminCommGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adminSubGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#d946ef" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="commission" stroke="#6366f1" fill="url(#adminCommGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="subscriptions" stroke="#d946ef" fill="url(#adminSubGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

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

        {/* Commission Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold font-[Outfit] text-white">Commission Control</h3>
            <span className="px-3 py-1 rounded-lg bg-green-500/15 text-green-400 text-xs font-medium">Active</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <div className="text-xs text-surface-200/40 mb-2">Current Rate</div>
              <div className="text-4xl font-bold font-[Outfit] gradient-text mb-2">6%</div>
              <div className="text-xs text-surface-200/30">Applied to all orders globally</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="text-xs text-surface-200/40 mb-2">This Month's Commission</div>
              <div className="text-4xl font-bold font-[Outfit] text-white mb-2">$312K</div>
              <div className="text-xs text-green-400">+8% from last month</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="text-xs text-surface-200/40 mb-2">Total Collected (YTD)</div>
              <div className="text-4xl font-bold font-[Outfit] text-white mb-2">$1.69M</div>
              <div className="text-xs text-surface-200/30">Since Jan 2026</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* KYC Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold font-[Outfit] text-white">KYC Verification Queue</h3>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-medium">3 Pending</span>
            </div>
            <div className="space-y-3">
              {kycQueue.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.status === 'approved' ? 'bg-green-500/15' :
                      item.status === 'rejected' ? 'bg-red-500/15' :
                        item.status === 'review' ? 'bg-blue-500/15' :
                          'bg-amber-500/15'
                      }`}>
                      {item.status === 'approved' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> :
                        item.status === 'rejected' ? <XCircle className="w-4 h-4 text-red-400" /> :
                          item.status === 'review' ? <Eye className="w-4 h-4 text-blue-400" /> :
                            <Clock className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{item.store}</div>
                      <div className="text-xs text-surface-200/40">{item.country} • {item.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {item.status === 'pending' && (
                      <>
                        <button className="px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs font-medium hover:bg-green-500/25 transition-colors">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-medium hover:bg-red-500/25 transition-colors">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Retailer Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold font-[Outfit] text-white">Top Retailers</h3>
              <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {stores.slice(0, 5).map((store, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-sm font-bold text-primary-300">
                      #{i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{store.name}</div>
                      <div className="text-xs text-surface-200/40">{store.country} • {store.plan}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold gradient-text">${store.revenue.toLocaleString()}</div>
                    <div className="text-xs text-surface-200/30">{store.totalProducts} products</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

