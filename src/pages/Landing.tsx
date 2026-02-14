import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
    ArrowRight, Globe, ShoppingBag, Store, Users, TrendingUp,
    Zap, Shield, CreditCard, Box, Star, ChevronRight, Sparkles,
    BarChart3, Rocket, Layers
} from 'lucide-react'
import HeroScene from '../components/HeroScene'
import { globalStats, categories, products } from '../data/mockData'

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return
        const duration = 2000
        const startTime = Date.now()
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress >= 1) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [isInView, end])

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.1 } },
}

export default function Landing() {
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <motion.section
                ref={heroRef}
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="relative min-h-screen flex items-center justify-center"
            >
                <HeroScene />

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-primary-300">
                            <Sparkles className="w-4 h-4" />
                            <span>The Future of Global Commerce is Here</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl sm:text-6xl lg:text-8xl font-black font-[Outfit] mb-6 leading-[0.95] tracking-tight"
                    >
                        <span className="block text-white">Shop the World</span>
                        <span className="block gradient-text">in Stunning 3D</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg sm:text-xl text-surface-200/60 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Connect with <span className="text-primary-400 font-semibold">18,000+ retailers</span> across{' '}
                        <span className="text-accent-400 font-semibold">54 countries</span>. Experience products in immersive 3D
                        before you buy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/products"
                            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold text-lg shadow-2xl shadow-primary-500/25 hover:shadow-accent-500/30 transition-all duration-300 hover:scale-105"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Explore Marketplace
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/pricing"
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                            <Store className="w-5 h-5" />
                            Start Selling
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-primary-400"
                        />
                    </div>
                </motion.div>
            </motion.section>

            {/* Stats Section */}
            <section className="relative py-24 grid-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    >
                        {[
                            { label: 'Retailers', value: globalStats.retailers, icon: Store, color: 'from-primary-500 to-primary-600' },
                            { label: 'Countries', value: globalStats.countries, icon: Globe, color: 'from-accent-500 to-accent-600' },
                            { label: 'Products', value: globalStats.products, suffix: '+', icon: Box, color: 'from-green-500 to-emerald-600' },
                            { label: 'Customers', value: globalStats.customers, suffix: '+', icon: Users, color: 'from-amber-500 to-orange-600' },
                            { label: 'GMV', value: 80, prefix: '$', suffix: 'M', icon: TrendingUp, color: 'from-cyan-500 to-blue-600' },
                            { label: 'Commission/mo', value: 4.8, prefix: '$', suffix: 'M', icon: BarChart3, color: 'from-rose-500 to-pink-600' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="glass rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all duration-300 group"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-2xl lg:text-3xl font-bold font-[Outfit] text-white mb-1">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                                </div>
                                <div className="text-sm text-surface-200/50">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/[0.02] to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-20"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm text-accent-300">
                            <Zap className="w-4 h-4" />
                            Why GlobalRetailX 3D
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold font-[Outfit] mb-6">
                            <span className="text-white">Everything You Need to </span>
                            <span className="gradient-text">Trade Globally</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-surface-200/50 max-w-2xl mx-auto">
                            From 3D product visualization to cross-border payments, we've built the complete global commerce infrastructure.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                icon: Box,
                                title: 'Immersive 3D Preview',
                                description: 'Rotate, zoom, and explore products in stunning 3D before purchasing. Supports GLTF/GLB models with HDR lighting.',
                                gradient: 'from-primary-500/20 to-primary-600/20',
                                border: 'border-primary-500/20',
                            },
                            {
                                icon: Globe,
                                title: 'Global Marketplace',
                                description: 'Connect with retailers from 54+ countries. Multi-currency, multi-language support with geo-location pricing.',
                                gradient: 'from-accent-500/20 to-accent-600/20',
                                border: 'border-accent-500/20',
                            },
                            {
                                icon: CreditCard,
                                title: 'Cross-Border Payments',
                                description: 'Powered by Stripe Connect & Dodo Payments. Support for 100+ currencies, UPI, credit cards, and more.',
                                gradient: 'from-green-500/20 to-emerald-600/20',
                                border: 'border-green-500/20',
                            },
                            {
                                icon: TrendingUp,
                                title: '6% Commission Engine',
                                description: 'Transparent commission auto-deduction. Real-time analytics dashboard with revenue forecasting.',
                                gradient: 'from-amber-500/20 to-orange-600/20',
                                border: 'border-amber-500/20',
                            },
                            {
                                icon: Shield,
                                title: 'Enterprise Security',
                                description: 'JWT auth, role-based access, PCI compliance, webhook verification, rate limiting, and audit logging.',
                                gradient: 'from-cyan-500/20 to-blue-600/20',
                                border: 'border-cyan-500/20',
                            },
                            {
                                icon: Rocket,
                                title: 'AI Recommendations',
                                description: 'Smart product suggestions powered by collaborative filtering. Personalized shopping experience for every customer.',
                                gradient: 'from-rose-500/20 to-pink-600/20',
                                border: 'border-rose-500/20',
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className={`group relative rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} p-8 hover:border-opacity-40 transition-all duration-500 hover:-translate-y-2`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold font-[Outfit] text-white mb-3">{feature.title}</h3>
                                <p className="text-surface-200/50 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold font-[Outfit] mb-4">
                            <span className="text-white">Browse </span>
                            <span className="gradient-text">Categories</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-surface-200/50 text-lg">
                            Over 1.2 million products across every category
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="glass rounded-2xl p-6 text-center cursor-pointer hover:bg-primary-500/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-2 group"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                                <h3 className="font-semibold text-white mb-1">{cat.name}</h3>
                                <p className="text-xs text-surface-200/40">{cat.count.toLocaleString()} products</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.02] to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="flex items-end justify-between mb-12"
                    >
                        <div>
                            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold font-[Outfit] mb-3">
                                <span className="text-white">Trending </span>
                                <span className="gradient-text">Products</span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-surface-200/50">
                                Most popular items from global retailers
                            </motion.p>
                        </div>
                        <motion.div variants={fadeInUp}>
                            <Link
                                to="/products"
                                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl glass text-sm font-medium text-primary-300 hover:text-white hover:bg-primary-500/10 transition-all"
                            >
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {products.slice(0, 4).map((product, i) => (
                            <motion.div key={i} variants={fadeInUp}>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="group block rounded-2xl glass overflow-hidden hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-surface-800 to-surface-900">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {product.has3DModel && (
                                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-primary-500/80 backdrop-blur-sm text-xs font-medium text-white flex items-center gap-1">
                                                <Layers className="w-3 h-3" />
                                                3D
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-xs text-white">
                                            {product.storeCountry}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs text-primary-400 mb-1">{product.store}</p>
                                        <h3 className="font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                <span className="text-sm font-medium text-white">{product.rating}</span>
                                            </div>
                                            <span className="text-xs text-surface-200/40">({product.reviews.toLocaleString()})</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold font-[Outfit] gradient-text">
                                                ${product.price}
                                            </span>
                                            <div className="flex gap-1">
                                                {product.colors.map((c, ci) => (
                                                    <div
                                                        key={ci}
                                                        className="w-4 h-4 rounded-full border border-white/10"
                                                        style={{ backgroundColor: c }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-20"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold font-[Outfit] mb-6">
                            <span className="text-white">How It </span>
                            <span className="gradient-text">Works</span>
                        </motion.h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                        {/* For Retailers */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                    <Store className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold font-[Outfit] text-white">For Retailers</h3>
                            </motion.div>
                            {[
                                { step: '01', title: 'Sign Up & Subscribe', desc: 'Choose a plan starting at $29/month. No tech setup required.' },
                                { step: '02', title: 'Upload Products', desc: 'Add products with 3D models (GLB/GLTF). Set prices in any currency.' },
                                { step: '03', title: 'Start Selling Globally', desc: 'Reach millions of customers worldwide. Get automated payouts.' },
                                { step: '04', title: 'Track & Grow', desc: 'Use analytics dashboard to optimize inventory and revenue.' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-start gap-4 mb-6 group"
                                >
                                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                                        <span className="text-sm font-bold gradient-text">{item.step}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-surface-200/50">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* For Customers */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold font-[Outfit] text-white">For Customers</h3>
                            </motion.div>
                            {[
                                { step: '01', title: 'Browse Global Stores', desc: 'Explore products from retailers in 54+ countries.' },
                                { step: '02', title: 'Preview in 3D', desc: 'Rotate, zoom, and examine products before buying.' },
                                { step: '03', title: 'Secure Checkout', desc: 'Pay in your local currency with Stripe or Dodo.' },
                                { step: '04', title: 'Track Your Order', desc: 'Real-time tracking from purchase to delivery.' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-start gap-4 mb-6 group"
                                >
                                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                                        <span className="text-sm font-bold gradient-text">{item.step}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-surface-200/50">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Commission Model */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/[0.03] to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold font-[Outfit] mb-4">
                            <span className="text-white">Transparent </span>
                            <span className="gradient-text">Commission Model</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-surface-200/50 text-lg max-w-xl mx-auto">
                            Simple 6% commission on every order. No hidden fees. Automated payouts.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="glass rounded-3xl p-8 lg:p-12">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <span className="text-surface-200/50">Order Amount</span>
                                <span className="text-3xl font-bold font-[Outfit] text-white">$100.00</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-surface-200/50">Platform Commission (6%)</span>
                                    <span className="text-xl font-semibold text-accent-400">- $6.00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-surface-200/50">Payment Processing</span>
                                    <span className="text-xl font-semibold text-surface-200/60">Included</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                                <span className="text-lg font-semibold text-white">Retailer Receives</span>
                                <span className="text-3xl font-bold font-[Outfit] gradient-text">$94.00</span>
                            </div>
                            <div className="mt-8 w-full h-3 rounded-full bg-surface-800 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: '94%' }} />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-surface-200/40">
                                <span>94% to Retailer</span>
                                <span>6% Commission</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold font-[Outfit] mb-6">
                            <span className="text-white">Ready to Go </span>
                            <span className="gradient-text">Global?</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-surface-200/50 mb-12 max-w-xl mx-auto">
                            Join 18,000+ retailers already selling on GlobalRetailX 3D. Start your journey today.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/pricing"
                                className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold text-lg shadow-2xl shadow-primary-500/25 hover:shadow-accent-500/30 transition-all duration-300 hover:scale-105"
                            >
                                <Rocket className="w-5 h-5" />
                                Start Selling Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/products"
                                className="flex items-center gap-3 px-10 py-5 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Start Shopping
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-warning-500 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold font-[Outfit] gradient-text">GlobalRetailX 3D</span>
                            </div>
                            <p className="text-sm text-surface-200/40 leading-relaxed">
                                The world's first 3D global multi-vendor e-commerce marketplace.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Platform</h4>
                            <ul className="space-y-2">
                                {['Marketplace', 'For Retailers', 'For Customers', 'Pricing'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-surface-200/40 hover:text-primary-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2">
                                {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-surface-200/40 hover:text-primary-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Legal</h4>
                            <ul className="space-y-2">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-surface-200/40 hover:text-primary-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-surface-200/30">© 2026 GlobalRetailX 3D. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <span className="text-xs text-surface-200/20">Powered by</span>
                            <span className="text-xs font-medium text-surface-200/40">Stripe</span>
                            <span className="text-xs font-medium text-surface-200/40">React Three Fiber</span>
                            <span className="text-xs font-medium text-surface-200/40">FastAPI</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
