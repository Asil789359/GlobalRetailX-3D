import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Star, Layers, Grid3X3, List, Globe, ShoppingCart } from 'lucide-react'
import { products, categories } from '../data/mockData'

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
    visible: { transition: { staggerChildren: 0.05 } },
}

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState('popular')

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.store.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold font-[Outfit] mb-3">
                        <span className="text-white">Global </span>
                        <span className="gradient-text">Marketplace</span>
                    </h1>
                    <p className="text-surface-200/50 text-lg">Discover products from retailers worldwide</p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col lg:flex-row gap-4 mb-8"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/30" />
                        <input
                            type="text"
                            placeholder="Search products, stores, categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl glass bg-surface-900/50 text-white placeholder-surface-200/30 outline-none focus:border-primary-500/40 transition-colors"
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3.5 rounded-xl glass bg-surface-900/50 text-white outline-none appearance-none cursor-pointer min-w-[160px]"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest First</option>
                        </select>
                        <div className="flex rounded-xl glass overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3.5 transition-colors ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-400' : 'text-surface-200/40 hover:text-white'}`}
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3.5 transition-colors ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-400' : 'text-surface-200/40 hover:text-white'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
                >
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === 'All'
                                ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                : 'glass text-surface-200/50 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4 inline mr-2" />
                        All Products
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.name
                                    ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                    : 'glass text-surface-200/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </motion.div>

                {/* Results count */}
                <div className="mb-6 text-sm text-surface-200/40">
                    Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                </div>

                {/* Product Grid */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className={`${viewMode === 'grid'
                            ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-4'
                        }`}
                >
                    {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={fadeInUp}>
                            {viewMode === 'grid' ? (
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
                                                3D Preview
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-xs text-white">
                                            {product.storeCountry}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <button className="w-full py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium flex items-center justify-center gap-2">
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Globe className="w-3 h-3 text-primary-400" />
                                            <p className="text-xs text-primary-400">{product.store}</p>
                                        </div>
                                        <h3 className="font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-surface-200/40 mb-3 line-clamp-2">{product.description}</p>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                <span className="text-sm font-medium text-white">{product.rating}</span>
                                            </div>
                                            <span className="text-xs text-surface-200/40">({product.reviews.toLocaleString()} reviews)</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold font-[Outfit] gradient-text">
                                                ${product.price}
                                            </span>
                                            <span className="text-xs text-surface-200/30">{product.stock} in stock</span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    to={`/product/${product.id}`}
                                    className="group flex gap-6 rounded-2xl glass p-4 hover:border-primary-500/30 transition-all duration-300"
                                >
                                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-surface-800 shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Globe className="w-3 h-3 text-primary-400" />
                                            <p className="text-xs text-primary-400">{product.store} — {product.storeCountry}</p>
                                            {product.has3DModel && (
                                                <span className="px-2 py-0.5 rounded-md bg-primary-500/20 text-xs text-primary-300">3D</span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-surface-200/40 mb-3 line-clamp-1">{product.description}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xl font-bold font-[Outfit] gradient-text">${product.price}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                <span className="text-sm text-white font-medium">{product.rating}</span>
                                                <span className="text-xs text-surface-200/40">({product.reviews.toLocaleString()})</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
