export interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    category: string;
    store: string;
    storeCountry: string;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    stock: number;
    has3DModel: boolean;
    colors: string[];
}

export interface Store {
    id: string;
    name: string;
    country: string;
    owner: string;
    plan: 'basic' | 'growth' | 'enterprise';
    totalProducts: number;
    revenue: number;
    rating: number;
    status: 'active' | 'pending' | 'suspended';
}

export interface Order {
    id: string;
    customer: string;
    total: number;
    commission: number;
    retailerAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    date: string;
    items: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Quantum Pro Headphones',
        price: 299.99,
        currency: 'USD',
        category: 'Electronics',
        store: 'TechNova Berlin',
        storeCountry: '🇩🇪 Germany',
        rating: 4.8,
        reviews: 1247,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        description: 'Premium wireless headphones with spatial audio, noise cancellation, and 40-hour battery life.',
        stock: 156,
        has3DModel: true,
        colors: ['#1a1a2e', '#e94560', '#0f3460'],
    },
    {
        id: '2',
        name: 'Aurora Smart Watch',
        price: 449.99,
        currency: 'USD',
        category: 'Electronics',
        store: 'WristTech Tokyo',
        storeCountry: '🇯🇵 Japan',
        rating: 4.9,
        reviews: 2341,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        description: 'Next-gen smartwatch with health monitoring, AMOLED display, and 7-day battery.',
        stock: 89,
        has3DModel: true,
        colors: ['#16213e', '#533483', '#e94560'],
    },
    {
        id: '3',
        name: 'Nebula Running Shoes',
        price: 189.99,
        currency: 'USD',
        category: 'Fashion',
        store: 'SportFlex NYC',
        storeCountry: '🇺🇸 USA',
        rating: 4.7,
        reviews: 3456,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        description: 'Ultra-lightweight running shoes with adaptive cushioning and breathable mesh.',
        stock: 312,
        has3DModel: true,
        colors: ['#e94560', '#0f3460', '#16213e'],
    },
    {
        id: '4',
        name: 'Artisan Leather Bag',
        price: 349.99,
        currency: 'USD',
        category: 'Fashion',
        store: 'Milano Craft',
        storeCountry: '🇮🇹 Italy',
        rating: 4.6,
        reviews: 876,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
        description: 'Handcrafted Italian leather bag with premium stitching and brass hardware.',
        stock: 45,
        has3DModel: true,
        colors: ['#8B4513', '#2F1B0E', '#D2691E'],
    },
    {
        id: '5',
        name: 'Crystal Desk Lamp',
        price: 129.99,
        currency: 'USD',
        category: 'Home',
        store: 'LightHouse Stockholm',
        storeCountry: '🇸🇪 Sweden',
        rating: 4.5,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        description: 'Minimalist crystal desk lamp with adjustable color temperature and brightness.',
        stock: 234,
        has3DModel: true,
        colors: ['#ffffff', '#ffd700', '#c0c0c0'],
    },
    {
        id: '6',
        name: 'Zen Tea Set',
        price: 89.99,
        currency: 'USD',
        category: 'Home',
        store: 'Ceramic Arts Kyoto',
        storeCountry: '🇯🇵 Japan',
        rating: 4.9,
        reviews: 1890,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        description: 'Traditional Japanese ceramic tea set with modern minimalist design.',
        stock: 78,
        has3DModel: true,
        colors: ['#2d3436', '#636e72', '#dfe6e9'],
    },
    {
        id: '7',
        name: 'ProShot Camera Lens',
        price: 1299.99,
        currency: 'USD',
        category: 'Electronics',
        store: 'OpticsPro Seoul',
        storeCountry: '🇰🇷 South Korea',
        rating: 4.8,
        reviews: 432,
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400',
        description: 'Professional 85mm f/1.4 portrait lens with nano coating and fast autofocus.',
        stock: 23,
        has3DModel: true,
        colors: ['#1a1a1a', '#333333', '#666666'],
    },
    {
        id: '8',
        name: 'Aroma Diffuser Pro',
        price: 79.99,
        currency: 'USD',
        category: 'Home',
        store: 'WellNest Mumbai',
        storeCountry: '🇮🇳 India',
        rating: 4.4,
        reviews: 2100,
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400',
        description: 'Smart aromatherapy diffuser with app control and mood lighting.',
        stock: 567,
        has3DModel: false,
        colors: ['#f5f5dc', '#8fbc8f', '#deb887'],
    },
];

export const stores: Store[] = [
    { id: 's1', name: 'TechNova Berlin', country: 'Germany', owner: 'Max Mueller', plan: 'enterprise', totalProducts: 245, revenue: 156780, rating: 4.8, status: 'active' },
    { id: 's2', name: 'WristTech Tokyo', country: 'Japan', owner: 'Yuki Tanaka', plan: 'growth', totalProducts: 89, revenue: 98450, rating: 4.9, status: 'active' },
    { id: 's3', name: 'SportFlex NYC', country: 'USA', owner: 'John Smith', plan: 'enterprise', totalProducts: 567, revenue: 234560, rating: 4.7, status: 'active' },
    { id: 's4', name: 'Milano Craft', country: 'Italy', owner: 'Maria Rossi', plan: 'growth', totalProducts: 34, revenue: 45670, rating: 4.6, status: 'active' },
    { id: 's5', name: 'LightHouse Stockholm', country: 'Sweden', owner: 'Erik Lindberg', plan: 'basic', totalProducts: 23, revenue: 12340, rating: 4.5, status: 'active' },
    { id: 's6', name: 'Ceramic Arts Kyoto', country: 'Japan', owner: 'Kenji Sato', plan: 'growth', totalProducts: 67, revenue: 67890, rating: 4.9, status: 'active' },
    { id: 's7', name: 'OpticsPro Seoul', country: 'South Korea', owner: 'Park Jin', plan: 'enterprise', totalProducts: 156, revenue: 345670, rating: 4.8, status: 'active' },
    { id: 's8', name: 'WellNest Mumbai', country: 'India', owner: 'Priya Sharma', plan: 'basic', totalProducts: 45, revenue: 23450, rating: 4.4, status: 'pending' },
];

export const recentOrders: Order[] = [
    { id: 'ORD-001', customer: 'Alice Johnson', total: 599.98, commission: 36.00, retailerAmount: 563.98, status: 'delivered', date: '2026-02-14', items: 2 },
    { id: 'ORD-002', customer: 'Bob Chen', total: 449.99, commission: 27.00, retailerAmount: 422.99, status: 'shipped', date: '2026-02-13', items: 1 },
    { id: 'ORD-003', customer: 'Sofia Garcia', total: 279.98, commission: 16.80, retailerAmount: 263.18, status: 'processing', date: '2026-02-13', items: 3 },
    { id: 'ORD-004', customer: 'Raj Patel', total: 1299.99, commission: 78.00, retailerAmount: 1221.99, status: 'pending', date: '2026-02-12', items: 1 },
    { id: 'ORD-005', customer: 'Emma Wilson', total: 189.99, commission: 11.40, retailerAmount: 178.59, status: 'delivered', date: '2026-02-12', items: 1 },
];

export const revenueData = [
    { month: 'Aug', revenue: 2400000, commission: 144000, subscriptions: 58000 },
    { month: 'Sep', revenue: 2800000, commission: 168000, subscriptions: 62000 },
    { month: 'Oct', revenue: 3200000, commission: 192000, subscriptions: 71000 },
    { month: 'Nov', revenue: 4100000, commission: 246000, subscriptions: 82000 },
    { month: 'Dec', revenue: 5600000, commission: 336000, subscriptions: 95000 },
    { month: 'Jan', revenue: 4800000, commission: 288000, subscriptions: 98000 },
    { month: 'Feb', revenue: 5200000, commission: 312000, subscriptions: 105000 },
];

export const categories = [
    { name: 'Electronics', count: 12450, icon: '⚡' },
    { name: 'Fashion', count: 34200, icon: '👗' },
    { name: 'Home', count: 8900, icon: '🏠' },
    { name: 'Sports', count: 5670, icon: '⚽' },
    { name: 'Beauty', count: 15300, icon: '💄' },
    { name: 'Books', count: 22100, icon: '📚' },
];

export const globalStats = {
    retailers: 18750,
    countries: 54,
    products: 1250000,
    customers: 8400000,
    gmv: 80000000,
    monthlyCommission: 4800000,
};
