const delay = (ms) => new Promise(res => setTimeout(res, ms));

const MOCK_STORES = [
  { id: '1', name: 'Meal Mart', retailer: 'Food & Beverages', region: 'North America', distance: '1.2 km', lat: 40.7128, lng: -74.0060, tags: ['Supermarket', '24/7'] },
  { id: '2', name: 'Tech Junction', retailer: 'Electronics', region: 'Europe', distance: '3.4 km', lat: 51.5074, lng: -0.1278, tags: ['Electronics'] },
  { id: '3', name: 'Fashion Hub', retailer: 'Apparel', region: 'Asia', distance: '5.6 km', lat: 35.6895, lng: 139.6917, tags: ['Mall'] },
  { id: '4', name: 'Green Grocers', retailer: 'Food & Beverages', region: 'North America', distance: '0.8 km', lat: 40.7282, lng: -73.9942, tags: ['Organic'] },
  { id: '5', name: 'City Mall', retailer: 'Apparel', region: 'Europe', distance: '2.1 km', lat: 48.8566, lng: 2.3522, tags: ['Mall', 'Flagship'] }
];

export const getStores = async () => {
  await delay(800);
  return MOCK_STORES;
};

export const getRetailers = async () => {
  await delay(500);
  return ['Food & Beverages', 'Electronics', 'Apparel', 'Supermarket'];
};

export const getRegions = async () => {
  await delay(500);
  return ['North America', 'Europe', 'Asia', 'South America'];
};

export const getStoreDetails = async (id) => {
  await delay(600);
  const store = MOCK_STORES.find(s => s.id === id);
  if (!store) throw new Error('Store not found');
  return store;
};

export const logLocationCheck = async (storeId, coords, status) => {
  await delay(400);
  return { success: true, loggedAt: new Date().toISOString(), status };
};

export const clockIn = async (data) => {
  await delay(1000);
  return { success: true, message: 'Clocked in successfully', sessionId: 'sess_' + Date.now() };
};
