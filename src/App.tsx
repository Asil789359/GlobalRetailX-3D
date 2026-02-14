import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import RetailerDashboard from './pages/RetailerDashboard'
import AdminPanel from './pages/AdminPanel'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/retailer" element={<RetailerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
