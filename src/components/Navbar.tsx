import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Globe, User, LayoutDashboard, Shield, Sparkles } from 'lucide-react'

const navLinks = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/products', label: 'Marketplace', icon: Globe },
    { path: '/pricing', label: 'Pricing', icon: null },
    { path: '/retailer', label: 'Retailer', icon: LayoutDashboard },
    { path: '/admin', label: 'Admin', icon: Shield },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'bg-surface-950/80 backdrop-blur-2xl border-b border-primary-500/10 shadow-lg shadow-primary-500/5'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-warning-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-warning-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold font-[Outfit] tracking-tight">
                                    <span className="gradient-text">GlobalRetailX</span>
                                </span>
                                <span className="text-[10px] font-medium text-primary-400/60 tracking-[0.2em] uppercase -mt-1">3D Commerce</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                                ? 'text-white'
                                                : 'text-surface-200/60 hover:text-white'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 rounded-xl bg-primary-500/15 border border-primary-500/20"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            {link.icon && <link.icon className="w-4 h-4" />}
                                            {link.label}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/cart"
                                className="relative p-2.5 rounded-xl glass hover:bg-primary-500/10 transition-all group"
                            >
                                <ShoppingCart className="w-5 h-5 text-surface-200/60 group-hover:text-primary-400 transition-colors" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-[10px] font-bold flex items-center justify-center">
                                    3
                                </span>
                            </Link>
                            <Link
                                to="/login"
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-medium hover:from-primary-500 hover:to-accent-500 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-accent-500/25"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </Link>
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden p-2.5 rounded-xl glass"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-16 z-40 bg-surface-950/95 backdrop-blur-2xl border-b border-primary-500/10 lg:hidden"
                    >
                        <div className="p-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path
                                            ? 'bg-primary-500/15 text-white'
                                            : 'text-surface-200/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {link.icon && <link.icon className="w-4 h-4" />}
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-medium mt-4"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
