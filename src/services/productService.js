// Products Module — Mock Data & Service Functions

const MOCK_PRODUCTS = [
  {
    id: 'p1', name: 'Sparkle Clean Detergent 2kg', articleNo: 'ARI-7XJ-045', barcode: '6001224284903',
    price: 45.75, category: 'Clothing Care', supplierName: 'BrightWave Industries', supplierId: '1',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 240, reorderLevel: 50, lastRestocked: '18 Sept 2025',
    rateOfSale: 12.5, lastSold: '02 Jul 2024',
    lastOrderDate: '18 Sept 2025', lastOrderQty: 48, lastReceiptDate: '30 Sept 2023',
    lastReceiptQty: 48, orderStatus: 'Delivered', articleNumber: '10517136', lastUpdated: '13 Oct 2025',
  },
  {
    id: 'p2', name: 'Wave Laundry Powder 2kg', articleNo: 'ARI-9LM-102', barcode: '6001224284904',
    price: 120.50, category: 'Fabric Refresh', supplierName: 'EcoPure Solutions', supplierId: '2',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 180, reorderLevel: 40, lastRestocked: '15 Sept 2025',
    rateOfSale: 8.3, lastSold: '10 Jul 2024',
    lastOrderDate: '15 Sept 2025', lastOrderQty: 60, lastReceiptDate: '22 Sept 2023',
    lastReceiptQty: 60, orderStatus: 'Delivered', articleNumber: '10517137', lastUpdated: '10 Oct 2025',
  },
  {
    id: 'p3', name: 'Breeze Washing Powder 2kg', articleNo: 'ARI-4PQ-078', barcode: '6001224284905',
    price: 89.99, category: 'Textile Maintenance', supplierName: 'GreenLeaf Enterprises', supplierId: '3',
    image: null, status: 'Ranged', stockStatus: 'Low Stock', rangeStatus: 'On Range',
    currentStock: 22, reorderLevel: 50, lastRestocked: '10 Sept 2025',
    rateOfSale: 15.2, lastSold: '15 Jul 2024',
    lastOrderDate: '10 Sept 2025', lastOrderQty: 100, lastReceiptDate: '18 Sept 2023',
    lastReceiptQty: 100, orderStatus: 'Delivered', articleNumber: '10517138', lastUpdated: '08 Oct 2025',
  },
  {
    id: 'p4', name: 'PureShine Detergent 2kg', articleNo: 'ARI-3BC-056', barcode: '6001224284906',
    price: 65.00, category: 'Garment Cleaning', supplierName: 'FreshStart Products', supplierId: '4',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 310, reorderLevel: 60, lastRestocked: '20 Sept 2025',
    rateOfSale: 9.8, lastSold: '05 Jul 2024',
    lastOrderDate: '20 Sept 2025', lastOrderQty: 80, lastReceiptDate: '28 Sept 2023',
    lastReceiptQty: 80, orderStatus: 'Delivered', articleNumber: '10517139', lastUpdated: '15 Oct 2025',
  },
  {
    id: 'p5', name: 'Ariel Washing Powder 2kg', articleNo: 'ARI-2KG-001', barcode: '6001224284907',
    price: 99.99, category: 'Laundry', supplierName: 'Procter & Gamble', supplierId: '5',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 240, reorderLevel: 80, lastRestocked: '18 Sept 2025',
    rateOfSale: 12.5, lastSold: '02 Jul 2024',
    lastOrderDate: '18 Sept 2025', lastOrderQty: 48, lastReceiptDate: '30 Sept 2023',
    lastReceiptQty: 48, orderStatus: 'Delivered', articleNumber: '10517136', lastUpdated: '13 Oct 2025',
  },
  {
    id: 'p6', name: 'EcoClean Detergent 4kg', articleNo: 'ARI-2KG-001', barcode: '6001224284908',
    price: 89.99, category: 'Laundry', supplierName: 'GreenLeaf Essentials', supplierId: '6',
    image: null, status: 'De-ranged', stockStatus: 'Out of Stock', rangeStatus: 'De-ranged',
    currentStock: 0, reorderLevel: 30, lastRestocked: '01 Aug 2025',
    rateOfSale: 3.1, lastSold: '20 Jun 2024',
    lastOrderDate: '01 Aug 2025', lastOrderQty: 24, lastReceiptDate: '10 Aug 2023',
    lastReceiptQty: 24, orderStatus: 'Pending', articleNumber: '10517140', lastUpdated: '01 Oct 2025',
  },
  {
    id: 'p7', name: 'PureWash Detergent 1kg', articleNo: 'ARI-2KG-001', barcode: '6001224284909',
    price: 69.99, category: 'Laundry', supplierName: 'FreshWave Industries', supplierId: '7',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 150, reorderLevel: 40, lastRestocked: '12 Sept 2025',
    rateOfSale: 7.4, lastSold: '08 Jul 2024',
    lastOrderDate: '12 Sept 2025', lastOrderQty: 36, lastReceiptDate: '20 Sept 2023',
    lastReceiptQty: 36, orderStatus: 'Delivered', articleNumber: '10517141', lastUpdated: '12 Oct 2025',
  },
  {
    id: 'p8', name: 'FreshWave Powder 10kg', articleNo: 'ARI-2KG-001', barcode: '6001224284910',
    price: 79.99, category: 'Laundry', supplierName: 'BrightWave Industries', supplierId: '1',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 95, reorderLevel: 30, lastRestocked: '05 Sept 2025',
    rateOfSale: 5.6, lastSold: '12 Jul 2024',
    lastOrderDate: '05 Sept 2025', lastOrderQty: 20, lastReceiptDate: '15 Sept 2023',
    lastReceiptQty: 20, orderStatus: 'Delivered', articleNumber: '10517142', lastUpdated: '05 Oct 2025',
  },
  {
    id: 'p9', name: 'Crystal Clear Soap Bar', articleNo: 'ARI-5RT-012', barcode: '6001224284911',
    price: 32.50, category: 'Personal Care', supplierName: 'EcoPure Solutions', supplierId: '2',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 400, reorderLevel: 100, lastRestocked: '22 Sept 2025',
    rateOfSale: 18.2, lastSold: '01 Jul 2024',
    lastOrderDate: '22 Sept 2025', lastOrderQty: 200, lastReceiptDate: '01 Oct 2023',
    lastReceiptQty: 200, orderStatus: 'Delivered', articleNumber: '10517143', lastUpdated: '22 Oct 2025',
  },
  {
    id: 'p10', name: 'Soft Touch Fabric Softener', articleNo: 'ARI-6YU-089', barcode: '6001224284912',
    price: 55.00, category: 'Fabric Refresh', supplierName: 'FreshStart Products', supplierId: '4',
    image: null, status: 'De-ranged', stockStatus: 'Low Stock', rangeStatus: 'De-ranged',
    currentStock: 8, reorderLevel: 25, lastRestocked: '01 Sept 2025',
    rateOfSale: 2.3, lastSold: '25 Jun 2024',
    lastOrderDate: '01 Sept 2025', lastOrderQty: 30, lastReceiptDate: '10 Sept 2023',
    lastReceiptQty: 30, orderStatus: 'Delivered', articleNumber: '10517144', lastUpdated: '01 Oct 2025',
  },
  {
    id: 'p11', name: 'UltraClean Floor Polish', articleNo: 'ARI-8WE-034', barcode: '6001224284913',
    price: 145.00, category: 'Garment Cleaning', supplierName: 'GreenLeaf Enterprises', supplierId: '3',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 65, reorderLevel: 20, lastRestocked: '25 Sept 2025',
    rateOfSale: 4.1, lastSold: '18 Jul 2024',
    lastOrderDate: '25 Sept 2025', lastOrderQty: 40, lastReceiptDate: '05 Oct 2023',
    lastReceiptQty: 40, orderStatus: 'Delivered', articleNumber: '10517145', lastUpdated: '25 Oct 2025',
  },
  {
    id: 'p12', name: 'BioFresh Stain Remover', articleNo: 'ARI-1QA-067', barcode: '6001224284914',
    price: 42.99, category: 'Textile Maintenance', supplierName: 'FreshWave Industries', supplierId: '7',
    image: null, status: 'Ranged', stockStatus: 'In Stock', rangeStatus: 'On Range',
    currentStock: 190, reorderLevel: 50, lastRestocked: '28 Sept 2025',
    rateOfSale: 11.0, lastSold: '20 Jul 2024',
    lastOrderDate: '28 Sept 2025', lastOrderQty: 100, lastReceiptDate: '08 Oct 2023',
    lastReceiptQty: 100, orderStatus: 'Delivered', articleNumber: '10517146', lastUpdated: '28 Oct 2025',
  },
];

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

export const getProducts = async () => {
  await delay();
  return MOCK_PRODUCTS;
};

export const getProductById = async (id) => {
  await delay();
  return MOCK_PRODUCTS.find(p => p.id === id) || null;
};

export const getCategories = async () => {
  await delay(100);
  return [...new Set(MOCK_PRODUCTS.map(p => p.category))];
};

export const getSupplierNames = async () => {
  await delay(100);
  return [...new Set(MOCK_PRODUCTS.map(p => p.supplierName))];
};
