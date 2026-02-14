# 🌍 GlobalRetailX 3D

### The World's First 3D Global Multi-Vendor E-Commerce Platform

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?logo=three.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## 🎯 Overview

**GlobalRetailX 3D** is an investor-grade global multi-vendor 3D e-commerce platform that connects retail shops worldwide. Experience products in immersive 3D before purchasing, with cross-border payments and transparent commission-based monetization.

### 💰 Business Model
- **6% commission** per order (auto-deducted)
- **Monthly subscriptions**: Basic ($29) | Growth ($79) | Enterprise (Custom)
- **Multi-currency**: USD + INR support
- **Cross-border payments**: Stripe + Dodo Payments

---

## 🚀 Features

### 🧊 3D Experience
- Interactive 3D product rotation with orbit controls
- Animated hero scene with distorted sphere & orbiting particles
- HDR environment lighting & contact shadows
- 5 parametric product shapes with metallic shaders

### 🛍 Marketplace
- Global product catalog with search & filters
- Grid/List view toggle
- Category browsing (Electronics, Fashion, Home, Sports, Beauty, Books)
- Multi-currency pricing display

### 📊 Retailer Dashboard
- Revenue analytics with area charts
- Commission transparency (94/6 revenue split)
- Product management (CRUD with 3D model upload)
- Order tracking with status badges

### 🛡 Admin Panel
- Platform-wide GMV & commission analytics
- Subscription plan breakdown (pie chart)
- KYC verification queue
- Top retailer rankings
- Commission rate control

### 🎨 Premium Design
- Glassmorphism UI throughout
- Gradient text effects
- Custom typography (Outfit + Inter)
- Micro-animations & scroll reveals
- Dark theme with cosmic aesthetic

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript |
| **Build** | Vite 8 |
| **3D Engine** | Three.js + React Three Fiber + Drei |
| **Styling** | TailwindCSS v4 |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v7 |

---

## 📦 Project Structure

```
src/
├── main.tsx                    # App entry
├── App.tsx                     # Route definitions
├── index.css                   # Design system & theme
├── components/
│   ├── Navbar.tsx              # Glassmorphic navigation
│   ├── HeroScene.tsx           # 3D hero (sphere, particles, rings)
│   └── ProductViewer.tsx       # 3D product viewer
├── data/
│   └── mockData.ts             # Products, stores, orders, stats
└── pages/
    ├── Landing.tsx             # Home page with 3D hero
    ├── Products.tsx            # Product marketplace
    ├── ProductDetail.tsx       # Product detail + 3D viewer
    ├── RetailerDashboard.tsx   # Retailer analytics
    ├── AdminPanel.tsx          # Admin platform management
    ├── Pricing.tsx             # Subscription plans
    ├── Login.tsx               # Authentication
    └── Cart.tsx                # Shopping cart + checkout
```

---

## 🛠 Getting Started

```bash
# Clone the repository
git clone https://github.com/Asil789359/GlobalRetailX-3D.git
cd GlobalRetailX-3D

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📈 Revenue Projection

| Metric | Value |
|--------|-------|
| Target Retailers | 20,000 |
| Avg Monthly Sales/Retailer | $4,000 |
| GMV | $80,000,000/month |
| Commission (6%) | $4,800,000/month |
| + Subscription Revenue | Additional MRR |

---

## 🗺 Roadmap

### Phase 1 ✅ (Complete)
- Core marketplace frontend
- 3D product visualization
- Retailer dashboard
- Admin panel
- Pricing & auth pages

### Phase 2 (Planned)
- FastAPI backend
- PostgreSQL database
- Stripe Connect integration
- JWT authentication
- Commission engine

### Phase 3 (Future)
- AI recommendation engine
- AR product preview
- Multi-language support
- Real-time analytics
- Fraud detection

---

## 📄 License

MIT License

---

Built with ❤️ using React, Three.js, and TailwindCSS
