import { useState } from 'react'

import { motion } from 'framer-motion'
import {
    Check, X, Sparkles, Zap, Crown, ArrowRight, Globe,
    Shield, Headphones, BarChart3, Layers, CreditCard
} from 'lucide-react'

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
}

const plans = [
    {
        name: 'Basic',
        icon: Zap,
        priceUSD: 29,
        priceINR: 2499,
        description: 'Perfect for small retailers getting started',
        gradient: 'from-blue-500 to-cyan-500',
        shadow: 'shadow-blue-500/20',
        features: [
            { text: 'Up to 50 products', included: true },
            { text: 'Basic 3D viewer', included: true },
            { text: 'Standard support', included: true },
            { text: 'Basic analytics', included: true },
            { text: 'Single currency', included: true },
            { text: 'AI recommendations', included: false },
            { text: 'Priority support', included: false },
            { text: 'API access', included: false },
            { text: 'Custom branding', included: false },
            { text: 'Advanced analytics', included: false },
        ],
    },
    {
        name: 'Growth',
        icon: Sparkles,
        priceUSD: 79,
        priceINR: 6499,
        description: 'For growing businesses scaling globally',
        gradient: 'from-primary-500 to-accent-500',
        shadow: 'shadow-primary-500/30',
        popular: true,
        features: [
            { text: 'Unlimited products', included: true },
            { text: 'Advanced 3D viewer', included: true },
            { text: 'Priority support', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'Multi-currency pricing', included: true },
            { text: 'AI recommendations', included: true },
            { text: 'Custom branding', included: true },
            { text: 'Bulk upload tools', included: true },
            { text: 'API access', included: false },
            { text: 'Dedicated account manager', included: false },
        ],
    },
    {
        name: 'Enterprise',
        icon: Crown,
        priceUSD: null,
        priceINR: null,
        description: 'For large businesses with custom needs',
        gradient: 'from-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/20',
        features: [
            { text: 'Unlimited everything', included: true },
            { text: 'Premium 3D + AR preview', included: true },
            { text: 'Dedicated support team', included: true },
            { text: 'Enterprise analytics', included: true },
            { text: 'All currencies supported', included: true },
            { text: 'AI recommendations', included: true },
            { text: 'White-label solution', included: true },
            { text: 'Full API access', included: true },
            { text: 'Dedicated account manager', included: true },
            { text: 'Custom integrations', included: true },
        ],
    },
]

export default function Pricing() {
    const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
    const [annual, setAnnual] = useState(false)

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm text-primary-300">
                        <CreditCard className="w-4 h-4" />
                        Simple, Transparent Pricing
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold font-[Outfit] mb-6">
                        <span className="text-white">Choose Your </span>
                        <span className="gradient-text">Growth Plan</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg text-surface-200/50 max-w-2xl mx-auto mb-10">
                        Start selling globally with a plan that fits your business. All plans include 6% commission on orders.
                    </motion.p>

                    {/* Toggle Controls */}
                    <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6">
                        {/* Currency Toggle */}
                        <div className="flex items-center gap-2 glass rounded-xl p-1">
                            <button
                                onClick={() => setCurrency('USD')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currency === 'USD'
                                    ? 'bg-primary-500/20 text-primary-300'
                                    : 'text-surface-200/40 hover:text-white'
                                    }`}
                            >
                                🇺🇸 USD
                            </button>
                            <button
                                onClick={() => setCurrency('INR')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currency === 'INR'
                                    ? 'bg-primary-500/20 text-primary-300'
                                    : 'text-surface-200/40 hover:text-white'
                                    }`}
                            >
                                🇮🇳 INR
                            </button>
                        </div>

                        {/* Billing Toggle */}
                        <div className="flex items-center gap-3">
                            <span className={`text-sm ${!annual ? 'text-white' : 'text-surface-200/40'}`}>Monthly</span>
                            <button
                                onClick={() => setAnnual(!annual)}
                                className={`relative w-12 h-6 rounded-full transition-all ${annual ? 'bg-primary-500' : 'bg-surface-700'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${annual ? 'left-7' : 'left-1'
                                        }`}
                                />
                            </button>
                            <span className={`text-sm ${annual ? 'text-white' : 'text-surface-200/40'}`}>
                                Annual
                                <span className="ml-1 text-xs text-green-400 font-medium">Save 20%</span>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Plans Grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-24"
                >
                    {plans.map((plan, i) => {
                        const price = currency === 'USD' ? plan.priceUSD : plan.priceINR
                        const symbol = currency === 'USD' ? '$' : '₹'
                        const displayPrice = price ? (annual ? Math.round(price * 0.8) : price) : null

                        return (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className={`relative rounded-3xl ${plan.popular
                                    ? 'glass border-2 border-primary-500/30 scale-[1.02]'
                                    : 'glass'
                                    } p-8 hover:border-primary-500/20 transition-all duration-500`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold shadow-lg shadow-primary-500/30">
                                        ⭐ Most Popular
                                    </div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                                    <plan.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold font-[Outfit] text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-surface-200/40 mb-6">{plan.description}</p>

                                <div className="mb-8">
                                    {displayPrice ? (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold font-[Outfit] gradient-text">
                                                {symbol}{displayPrice.toLocaleString()}
                                            </span>
                                            <span className="text-surface-200/40 text-sm">/month</span>
                                        </div>
                                    ) : (
                                        <div className="text-4xl font-bold font-[Outfit] gradient-text">Custom</div>
                                    )}
                                    {annual && price && (
                                        <div className="text-xs text-green-400 mt-1">
                                            Save {symbol}{Math.round(price * 12 * 0.2).toLocaleString()}/year
                                        </div>
                                    )}
                                </div>

                                <button
                                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mb-8 ${plan.popular
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-accent-500/30 hover:scale-[1.02]'
                                        : plan.priceUSD === null
                                            ? 'glass text-white hover:bg-white/10'
                                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {plan.priceUSD === null ? 'Contact Sales' : 'Get Started'}
                                </button>

                                <div className="space-y-3">
                                    {plan.features.map((feature, fi) => (
                                        <div key={fi} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className="w-4 h-4 text-green-400 shrink-0" />
                                            ) : (
                                                <X className="w-4 h-4 text-surface-200/20 shrink-0" />
                                            )}
                                            <span className={`text-sm ${feature.included ? 'text-surface-200/70' : 'text-surface-200/25'}`}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom Features */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold font-[Outfit] text-white mb-4">
                        All Plans Include
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-surface-200/40 mb-12">
                        Everything you need to run a successful global retail business
                    </motion.p>
                    <motion.div
                        variants={stagger}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { icon: Globe, title: 'Global Reach', desc: 'Sell to customers in 54+ countries' },
                            { icon: Layers, title: '3D Product Views', desc: 'Interactive 3D product visualization' },
                            { icon: Shield, title: 'Secure Payments', desc: 'Stripe & Dodo Payments integration' },
                            { icon: BarChart3, title: 'Analytics', desc: 'Track revenue, orders & growth' },
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeInUp} className="glass rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                <p className="text-xs text-surface-200/40">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* FAQ-like CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl p-12 text-center"
                >
                    <Headphones className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold font-[Outfit] text-white mb-3">Need help choosing a plan?</h3>
                    <p className="text-surface-200/50 mb-6 max-w-lg mx-auto">
                        Our sales team is ready to help you find the perfect plan for your business needs.
                    </p>
                    <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-accent-500/30 transition-all hover:scale-105">
                        Talk to Sales
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
