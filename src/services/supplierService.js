// Simulated Mock Data based on Figma Snapshots
const MOCK_SUPPLIERS = [
  { id: '1', name: 'GreenLeaf Industries', location: 'Sunnyvale', productCount: 87, isFavorite: false },
  { id: '2', name: 'EcoWave Solutions', location: 'Riverwood', productCount: 203, isFavorite: false },
  { id: '3', name: 'PureEssence Corp.', location: 'Maple Grove', productCount: 56, isFavorite: false },
  { id: '4', name: 'Nature\'s Best Supplies', location: 'Cedar Valley', productCount: 312, isFavorite: false },
  { id: '5', name: 'BrightWave Industries', location: 'Ocean City', productCount: 120, isFavorite: false },
  { id: '6', name: 'Coca-Cola', location: 'Atlanta', productCount: 450, isFavorite: false },
  { id: '7', name: 'PepsiCo', location: 'New York', productCount: 380, isFavorite: false },
];

const MOCK_METRICS = {
  articlePerformance: {
    active: 32,
    total: 58,
    ranged: 32,
    deranged: 26
  },
  stockHealth: {
    availabilityPercent: 92,
    ranged: 32,
    deranged: 26
  },
  salesMetrics: {
    rateOfSale: 1.87,
    noSales30Days: 5
  },
  wastageTracking: {
    qty: 5,
    percentage: 0.20,
    statusText: 'Excellent - Below 1%'
  }
};

const MOCK_PRODUCTS = [
  {
    id: 'p1', name: 'Sparkle Clean Detergent 2kg', articleNo: 'ARI-7XJ-045',
    price: 45.75, category: 'Laundry', supplierName: 'BrightWave Industries',
    status: 'Ranged', stockStatus: 'In Stock', image: 'https://via.placeholder.com/60',
    currentStock: 10, reorderLevel: 15, lastRestocked: '10/28/2025',
    avgDailySales: 4.2, totalSales: 125, lastSale: 'Today', trend: 'Trending Up',
  },
  {
    id: 'p2', name: 'Wave Laundry Powder 2kg', articleNo: 'ARI-9LM-102',
    price: 120.50, category: 'Laundry', supplierName: 'EcoPure Solutions',
    status: 'De-ranged', stockStatus: 'Out of Stock', image: 'https://via.placeholder.com/60',
    currentStock: 0, reorderLevel: 15, lastRestocked: '10/28/2025',
    avgDailySales: 3.3, totalSales: 98, lastSale: '2 days ago', trend: 'Declining',
  },
  {
    id: 'p3', name: 'Breeze Washing Powder 2kg', articleNo: 'ARI-4PQ-078',
    price: 89.99, category: 'Laundry', supplierName: 'GreenLeaf Enterprises',
    status: 'Ranged', stockStatus: 'Low Stock', image: 'https://via.placeholder.com/60',
    currentStock: 3, reorderLevel: 15, lastRestocked: '10/28/2025',
    avgDailySales: 2.1, totalSales: 63, lastSale: 'Yesterday', trend: 'Trending Up',
  },
  {
    id: 'p4', name: 'Ariel Washing Powder 2kg', articleNo: 'ARI-2KG-001',
    price: 99.99, category: 'Laundry', supplierName: 'Procter & Gamble',
    status: 'Ranged', stockStatus: 'In Stock', image: 'https://via.placeholder.com/60',
    currentStock: 10, reorderLevel: 15, lastRestocked: '10/28/2025',
    avgDailySales: 4.2, totalSales: 125, lastSale: 'Today', trend: 'Trending Up',
  },
  {
    id: 'p5', name: 'Knorr Stock Cubes Chicken', articleNo: 'KNR-CHK-24',
    price: 99.99, category: 'Food', supplierName: 'Procter & Gamble',
    status: 'Ranged', stockStatus: 'In Stock', image: 'https://via.placeholder.com/60',
    currentStock: 22, reorderLevel: 10, lastRestocked: '10/28/2025',
    avgDailySales: 3.3, totalSales: 98, lastSale: '2 days ago', trend: 'Declining',
  },
  {
    id: 'p6', name: 'Sunlight Liquid Detergent', articleNo: 'SUN-LIQ-750',
    price: 99.99, category: 'Laundry', supplierName: 'Unilever',
    status: 'Ranged', stockStatus: 'In Stock', image: 'https://via.placeholder.com/60',
    currentStock: 10, reorderLevel: 15, lastRestocked: '10/28/2025',
    avgDailySales: 1.8, totalSales: 55, lastSale: '3 days ago', trend: 'Trending Up',
  },
  {
    id: 'p7', name: 'Dove Beauty Bar 100g', articleNo: 'DOV-BAR-100',
    price: 99.99, category: 'Personal Care', supplierName: 'Unilever',
    status: 'De-ranged', stockStatus: 'Low Stock', image: 'https://via.placeholder.com/60',
    currentStock: 4, reorderLevel: 20, lastRestocked: '10/05/2025',
    avgDailySales: 2.5, totalSales: 74, lastSale: 'Yesterday', trend: 'Declining',
  },
];

// Helper to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSuppliers = async () => {
  await delay(600);
  return MOCK_SUPPLIERS;
};

export const getSupplierDetails = async (id) => {
  await delay(400);
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === id);
  if (!supplier) throw new Error('Supplier not found');
  return supplier;
};

export const getSupplierMetrics = async (id) => {
  await delay(800);
  return MOCK_METRICS; // Assuming same metrics for mockup purposes
};

export const getSupplierProducts = async (id) => {
  await delay(500);
  return MOCK_PRODUCTS; // Assuming same products for mockup purposes
};
