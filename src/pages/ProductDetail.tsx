import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw,
    Globe, Layers, ChevronRight, Minus, Plus, Box
} from 'lucide-react'
import ProductViewer from '../components/ProductViewer'
import { products } from '../data/mockData'

const shapes = ['box', 'sphere', 'torus', 'dodecahedron', 'cylinder']

export default function ProductDetail() {
    const { id } = useParams()
    const product = products.find((p) => p.id === id) || products[0]
    const [selectedColor, setSelectedColor] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [showingImage, setShowingImage] = useState(false)

    const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)
    const shape = shapes[parseInt(product.id) % shapes.length]

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
                    <span className="text-white">{product.name}</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="glass rounded-3xl overflow-hidden">
                            {!showingImage && product.has3DModel ? (
                                <div className="relative h-[500px]">
                                    <ProductViewer color={product.colors[selectedColor]} shape={shape} />
                                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-primary-500/80 backdrop-blur-sm text-sm font-medium text-white flex items-center gap-2">
                                        <Layers className="w-4 h-4" />
                                        3D Interactive View
                                    </div>
                                    <button
                                        onClick={() => setShowingImage(true)}
                                        className="absolute bottom-4 left-4 px-4 py-2 rounded-xl glass text-sm text-white hover:bg-white/10 transition-all"
                                    >
                                        View Photo
                                    </button>
                                </div>
                            ) : (
                                <div className="relative h-[500px]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {product.has3DModel && (
                                        <button
                                            onClick={() => setShowingImage(false)}
                                            className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-primary-500/80 backdrop-blur-sm text-sm font-medium text-white flex items-center gap-2 hover:bg-primary-500/90 transition-all"
                                        >
                                            <Box className="w-4 h-4" />
                                            View 3D Model
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Color thumbnails */}
                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-xs text-surface-200/40">Colors:</span>
                            {product.colors.map((color, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedColor(i)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i
                                            ? 'border-primary-400 scale-125'
                                            : 'border-white/10 hover:border-white/30'
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Globe className="w-4 h-4 text-primary-400" />
                            <span className="text-sm text-primary-400 font-medium">{product.store}</span>
                            <span className="text-surface-200/30">•</span>
                            <span className="text-sm text-surface-200/40">{product.storeCountry}</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold font-[Outfit] text-white mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                ? 'text-amber-400 fill-amber-400'
                                                : 'text-surface-200/20'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-white">{product.rating}</span>
                            <span className="text-sm text-surface-200/40">({product.reviews.toLocaleString()} reviews)</span>
                        </div>

                        <p className="text-surface-200/60 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="glass rounded-2xl p-6 mb-6">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold font-[Outfit] gradient-text">
                                    ${product.price}
                                </span>
                                <span className="text-sm text-surface-200/40">{product.currency}</span>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-sm text-surface-200/50">Quantity:</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-xs text-surface-200/30">{product.stock} available</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-accent-500/30 transition-all hover:scale-[1.02]">
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                <button className="p-4 rounded-xl glass hover:bg-white/10 transition-all group">
                                    <Heart className="w-5 h-5 text-surface-200/40 group-hover:text-rose-400 transition-colors" />
                                </button>
                                <button className="p-4 rounded-xl glass hover:bg-white/10 transition-all group">
                                    <Share2 className="w-5 h-5 text-surface-200/40 group-hover:text-primary-400 transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                            {[
                                { icon: Truck, text: 'Free worldwide shipping on orders over $50', color: 'text-green-400' },
                                { icon: Shield, text: 'Buyer protection guarantee — full refund if not delivered', color: 'text-blue-400' },
                                { icon: RefreshCw, text: '30-day free returns on all items', color: 'text-amber-400' },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-surface-200/50">
                                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                                    {feature.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24"
                    >
                        <h2 className="text-2xl font-bold font-[Outfit] text-white mb-8">Related Products</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProducts.map((rp) => (
                                <Link
                                    key={rp.id}
                                    to={`/product/${rp.id}`}
                                    className="group block rounded-2xl glass overflow-hidden hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={rp.image}
                                            alt={rp.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-primary-400 mb-1">{rp.store}</p>
                                        <h3 className="font-semibold text-white mb-2">{rp.name}</h3>
                                        <span className="text-lg font-bold gradient-text">${rp.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
