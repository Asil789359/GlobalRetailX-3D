import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Store, Eye, EyeOff, Globe, ArrowRight, Sparkles } from 'lucide-react'

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [role, setRole] = useState<'customer' | 'retailer'>('customer')
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    return (
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 grid-pattern opacity-50" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md mx-4"
            >
                <div className="glass rounded-3xl p-8 lg:p-10">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-warning-500 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-bold font-[Outfit] gradient-text">GlobalRetailX</span>
                            <span className="block text-[10px] text-primary-400/60 tracking-[0.2em] uppercase -mt-1">3D Commerce</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold font-[Outfit] text-white text-center mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-sm text-surface-200/40 text-center mb-8">
                        {isLogin ? 'Sign in to your account' : 'Join the global 3D commerce revolution'}
                    </p>

                    {/* Role Toggle (Register only) */}
                    {!isLogin && (
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setRole('customer')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${role === 'customer'
                                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                                        : 'glass text-surface-200/40 hover:text-white'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                Customer
                            </button>
                            <button
                                onClick={() => setRole('retailer')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${role === 'retailer'
                                        ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                                        : 'glass text-surface-200/40 hover:text-white'
                                    }`}
                            >
                                <Store className="w-4 h-4" />
                                Retailer
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/30" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-surface-200/30 outline-none focus:border-primary-500/40 transition-colors"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/30" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-surface-200/30 outline-none focus:border-primary-500/40 transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/30" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-surface-200/30 outline-none focus:border-primary-500/40 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-200/30 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        {!isLogin && role === 'retailer' && (
                            <div className="glass rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-accent-400" />
                                    <span className="text-sm font-medium text-white">Retailer Benefits</span>
                                </div>
                                <ul className="space-y-1">
                                    {['Global reach to 54+ countries', '3D product visualization', 'Starting at only $29/month'].map((benefit, i) => (
                                        <li key={i} className="text-xs text-surface-200/40 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-accent-400" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-accent-500/30 transition-all hover:scale-[1.02]"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-surface-200/30">or continue with</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-surface-200/60 hover:text-white hover:bg-white/[0.06] transition-all">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-surface-200/60 hover:text-white hover:bg-white/[0.06] transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Switch */}
                    <p className="text-center text-sm text-surface-200/40 mt-6">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
