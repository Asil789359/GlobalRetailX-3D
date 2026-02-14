import { motion, type Variants } from "framer-motion"
import {
    Star, Eye, Upload, Layers, Edit3, Trash2
} from 'lucide-react'
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
                            <h3 className="text-lg font-semibold font-[Outfit] text-white">Revenue Overview</h3>
                            <p className="text-xs text-surface-200/40">Last 7 months</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary-500" />
                                <span className="text-xs text-surface-200/40">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-accent-500" />
                                <span className="text-xs text-surface-200/40">Commission</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={monthlyRevenue}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="commissionGradient" x1="0" y1="0" x2="0" y2="1">
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
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                }}
                                labelStyle={{ color: '#fff' }}
                                formatter={(value, name) => {
                                    const safeValue = typeof value === "number" ? value : 0
                                    const safeName = typeof name === "string" ? name : ""

                                    return [`$${safeValue.toLocaleString()}`, safeName]
                                }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revenueGradient)" strokeWidth={2} />
                            <Area type="monotone" dataKey="commission" stroke="#d946ef" fill="url(#commissionGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Commission Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold font-[Outfit] text-white mb-4">Commission Transparency</h3>
                    <div className="space-y-4">
                        <div className="glass rounded-xl p-4">
                            <div className="text-xs text-surface-200/40 mb-1">Total Earnings</div>
                            <div className="text-2xl font-bold font-[Outfit] text-white">$156,780</div>
                        </div>
                        <div className="glass rounded-xl p-4">
                            <div className="text-xs text-surface-200/40 mb-1">Commission Paid (6%)</div>
                            <div className="text-2xl font-bold font-[Outfit] text-accent-400">-$9,407</div>
                        </div>
                        <div className="glass rounded-xl p-4 gradient-border">
                            <div className="text-xs text-surface-200/40 mb-1">Net Revenue</div>
                            <div className="text-2xl font-bold font-[Outfit] gradient-text">$147,373</div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-surface-200/40 mb-2">
                                <span>Revenue Split</span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-surface-800 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: '94%' }} />
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] text-surface-200/30">
                                <span>94% You</span>
                                <span>6% Platform</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Products Management */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-2xl p-6 mb-8"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold font-[Outfit] text-white">Your Products</h3>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500/10 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-all">
                        <Upload className="w-4 h-4" />
                        Upload 3D Model
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Product</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Price</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Stock</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Rating</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">3D</th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice(0, 5).map((product, i) => (
                                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            <div>
                                                <div className="text-sm font-medium text-white">{product.name}</div>
                                                <div className="text-xs text-surface-200/40">{product.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm font-semibold gradient-text">${product.price}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-sm ${product.stock < 50 ? 'text-amber-400' : 'text-green-400'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            <span className="text-sm text-white">{product.rating}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        {product.has3DModel ? (
                                            <span className="px-2 py-1 rounded-md bg-primary-500/20 text-xs text-primary-300 flex items-center gap-1 w-fit">
                                                <Layers className="w-3 h-3" />
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="text-xs text-surface-200/30">No</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <Eye className="w-4 h-4 text-surface-200/40" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <Edit3 className="w-4 h-4 text-surface-200/40" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                                                <Trash2 className="w-4 h-4 text-red-400/40" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-2xl p-6"
            >
                <h3 className="text-lg font-semibold font-[Outfit] text-white mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Order ID</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Customer</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Total</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Commission</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">You Receive</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-surface-200/40 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order, i) => (
                                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4 text-sm font-mono text-primary-400">{order.id}</td>
                                    <td className="py-3 px-4 text-sm text-white">{order.customer}</td>
                                    <td className="py-3 px-4 text-sm font-semibold text-white">${order.total.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm text-accent-400">-${order.commission.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm font-semibold gradient-text">${order.retailerAmount.toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${order.status === 'delivered' ? 'bg-green-500/15 text-green-400' :
                                            order.status === 'shipped' ? 'bg-blue-500/15 text-blue-400' :
                                                order.status === 'processing' ? 'bg-amber-500/15 text-amber-400' :
                                                    'bg-surface-200/10 text-surface-200/40'
                                            }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
