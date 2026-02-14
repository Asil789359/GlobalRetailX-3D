import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ShoppingCart, Trash2, Minus, Plus, ArrowRight, Globe,
    Truck, Shield, CreditCard, Tag, Layers, ChevronRight
} from 'lucide-react'
import { products } from '../data/mockData'

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
}

interface CartItem {
    product: typeof products[0]
    quantity: number
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 2 },
        { product: products[5], quantity: 1 },
    ])
    const [promoCode, setPromoCode] = useState('')

    const updateQuantity = (index: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        )
    }

    const removeItem = (index: number) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index))
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-surface-200/40 mb-8"
                >
                    <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/products" className="hover:text-primary-400 transition-colors">Marketplace</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Cart</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl lg:text-4xl font-bold font-[Outfit] mb-10"
                >
                    <span className="text-white">Shopping </span>
                    <span className="gradient-text">Cart</span>
                    <span className="text-lg font-normal text-surface-200/40 ml-4">({cartItems.length} items)</span>
                </motion.h1>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl p-16 text-center"
                    >
                        <ShoppingCart className="w-16 h-16 text-surface-200/20 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold font-[Outfit] text-white mb-3">Your cart is empty</h2>
                        <p className="text-surface-200/40 mb-8">Explore our global marketplace and discover amazing products</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:scale-105 transition-all"
                        >
                            Explore Marketplace
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-2 space-y-4"
                        >
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.product.id}
                                    variants={fadeInUp}
                                    className="glass rounded-2xl p-5 hover:border-primary-500/20 transition-all"
                                >
                                    <div className="flex gap-5">
                                        {/* Image */}
                                        <Link to={`/product/${item.product.id}`} className="shrink-0">
                                            <div className="w-28 h-28 rounded-xl overflow-hidden bg-surface-800 group">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Globe className="w-3 h-3 text-primary-400" />
                                                        <span className="text-xs text-primary-400">{item.product.store}</span>
                                                        <span className="text-xs text-surface-200/30">{item.product.storeCountry}</span>
                                                    </div>
                                                    <Link
                                                        to={`/product/${item.product.id}`}
                                                        className="text-lg font-semibold text-white hover:text-primary-300 transition-colors line-clamp-1"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    {item.product.has3DModel && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-md bg-primary-500/15 text-xs text-primary-300">
                                                            <Layers className="w-3 h-3" />
                                                            3D Preview Available
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(index)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                                                >
                                                    <Trash2 className="w-4 h-4 text-surface-200/30 group-hover:text-red-400 transition-colors" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(index, -1)}
                                                        className="p-1.5 rounded-lg glass hover:bg-white/10 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-10 text-center font-semibold text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(index, 1)}
                                                        className="p-1.5 rounded-lg glass hover:bg-white/10 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <div className="text-xl font-bold font-[Outfit] gradient-text">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </div>
                                                    {item.quantity > 1 && (
                                                        <div className="text-xs text-surface-200/30">
                                                            ${item.product.price.toFixed(2)} each
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="glass rounded-3xl p-6 lg:p-8 sticky top-28">
                                <h2 className="text-xl font-bold font-[Outfit] text-white mb-6">Order Summary</h2>

                                {/* Promo Code */}
                                <div className="flex gap-2 mb-6">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-200/30" />
                                        <input
                                            type="text"
                                            placeholder="Promo code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-surface-200/30 outline-none focus:border-primary-500/40 transition-colors"
                                        />
                                    </div>
                                    <button className="px-4 py-3 rounded-xl bg-primary-500/10 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-all">
                                        Apply
                                    </button>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-surface-200/50">Subtotal</span>
                                        <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-surface-200/50">Shipping</span>
                                        <span className={`font-medium ${shipping === 0 ? 'text-green-400' : 'text-white'}`}>
                                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-surface-200/50">Estimated Tax</span>
                                        <span className="text-white font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-white">Total</span>
                                        <span className="text-2xl font-bold font-[Outfit] gradient-text">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-accent-500/30 transition-all hover:scale-[1.02] mb-4">
                                    <CreditCard className="w-5 h-5" />
                                    Checkout
                                </button>

                                <div className="flex items-center justify-center gap-4 text-xs text-surface-200/30 mb-6">
                                    <span>Powered by</span>
                                    <span className="font-medium text-surface-200/50">Stripe</span>
                                    <span>•</span>
                                    <span className="font-medium text-surface-200/50">Dodo</span>
                                </div>

                                {/* Trust signals */}
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    {[
                                        { icon: Truck, text: 'Free shipping on orders over $50' },
                                        { icon: Shield, text: 'Buyer protection guarantee' },
                                        { icon: CreditCard, text: 'Secure PCI-compliant checkout' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-surface-200/40">
                                            <item.icon className="w-3.5 h-3.5 text-primary-400/60" />
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}
