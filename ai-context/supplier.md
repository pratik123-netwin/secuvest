# Module: Supplier

## Module Overview
Supplier browsing and performance analysis module for Secuvest GO. Allows staff to select one or multiple suppliers, browse all their products in a unified list, drill into a single supplier's detailed metrics (article performance, stock health, sales, wastage), and filter products by Ranged/De-ranged status.

---

## Module Responsibilities
- List all suppliers with search, filter (region, A-Z sort, favourites only), and star-favourite toggling
- Support single-select mode (tap to highlight, tap again to deselect, Continue FAB appears)
- Support multi-select mode (checkboxes, count FAB shows how many selected)
- Navigate to a multi-supplier product list hub with blue summary card and dismissible chip row
- Allow editing selected suppliers via Edit button (navigates back with pre-selected state restored)
- Navigate to a single-supplier profile with Overview and Products tabs
- Display supplier performance metrics: Article Performance, Stock Health, Sales Metrics, Wastage Tracking
- Show products list per supplier with search
- Drill down into specific metrics (Ranged vs De-ranged products)

---

## Key Screens

SelectSupplierScreen
`src/screens/Supplier/SelectSupplierScreen.jsx`
Main supplier list. Supports single-select (tap-toggle with yellow highlight and Continue FAB) and multi-select (checkbox mode with count FAB). Filter modal and search bar integrated. Accepts `preSelectedSuppliers` param from Edit navigation to restore prior selection state.

SupplierProfileScreen
`src/screens/Supplier/SupplierProfileScreen.jsx`
Multi-supplier product list hub. Shows blue summary card with supplier count and names as dismissible chips. Edit button navigates back to SelectSupplierScreen with those suppliers pre-selected. Searchable product list — tapping a product navigates to SupplierDetailScreen.

SupplierDetailScreen
`src/screens/Supplier/SupplierDetailScreen.jsx`
Single-supplier detail screen with Overview and Products tabs. Shows compact blue supplier card (name + location). Overview tab shows full metric cards; Products tab shows a searchable product list.

SupplierOverviewTab
`src/screens/Supplier/SupplierOverviewTab.jsx`
Tab component used inside SupplierDetailScreen. Renders four metric sections: Article Performance (progress bar + Ranged/De-ranged cards), Stock Health (availability progress bar + Ranged/De-ranged cards), Sales Metrics (Rate of Sale, No Sales 30 Days), and Wastage Tracking (quantity + percentage + status text). Each metric card has a drill-down arrow.

SupplierProductsTab
`src/screens/Supplier/SupplierProductsTab.jsx`
Tab component used inside SupplierDetailScreen. Shows searchable product list for a specific supplier.

MetricsDrilldownScreen
`src/screens/Supplier/MetricsDrilldownScreen.jsx`
Opened from Overview metric drill-down arrows. Shows summary Ranged/De-ranged stat cards, a TabBar to toggle between Ranged and De-ranged lists, and a filtered searchable product list with StatusBadges.

---

## API Endpoints Used

GET /api/suppliers
Fetch list of all suppliers
Auth Required: Yes
Service: `src/services/supplierService.js`

GET /api/suppliers/:id
Fetch individual supplier details
Auth Required: Yes
Service: `src/services/supplierService.js`

GET /api/suppliers/:id/metrics
Fetch supplier performance metrics (article performance, stock health, sales, wastage)
Auth Required: Yes
Service: `src/services/supplierService.js`

GET /api/suppliers/:id/products
Fetch list of products for a specific supplier
Auth Required: Yes
Service: `src/services/supplierService.js`

> Note: All endpoints are currently mocked in `supplierService.js` with configurable delay.

---

## State Management

Local State:

SelectSupplierScreen:
- `suppliers` — full supplier list from API
- `loading`, `error` — async state flags
- `searchQuery` — real-time search filter
- `isMultiSelect` — toggles between single and multi-select mode
- `selectedIds` — array of IDs in multi-select mode
- `singleSelectedId` — single selected ID (null = none); tap toggles on/off
- `filterVisible` — controls FilterModal visibility
- `selectedRegion`, `sortAZ`, `favoritesOnly` — active filter state
- `preSelectedSuppliers` — read from `route.params` to restore prior selection on Edit

SupplierProfileScreen:
- `chips` — dismissible supplier chip array (initially from `selectedSuppliers` param)
- `products` — product list from API
- `loading`, `error` — async state flags
- `searchQuery` — product search filter

SupplierDetailScreen:
- `activeTab` — `'Overview'` or `'Products'`

SupplierOverviewTab:
- `metrics` — fetched metrics object
- `loading`, `error` — async state flags

SupplierProductsTab:
- `products` — fetched product list
- `loading`, `error` — async state flags
- `searchQuery` — real-time product search filter

MetricsDrilldownScreen:
- `products` — fetched product list
- `loading`, `error` — async state flags
- `activeTab` — `'Ranged'` or `'De-ranged'`
- `searchQuery` — product search filter

Redux: None used in Supplier module
AsyncStorage: None used in Supplier module

---

## Reusable Components Used

`BackButton` — `src/components/BackButton.jsx`
`SearchBar` — `src/components/SearchBar.jsx`
`FilterModal` — `src/components/FilterModal.jsx`
`Checkbox` — `src/components/common/Checkbox.jsx`
`SupplierCard` — `src/components/common/SupplierCard.jsx`
`SupplierChip` — `src/components/common/SupplierChip.jsx`
`ProductCard` — `src/components/common/ProductCard.jsx`
`StatusBadge` — `src/components/common/StatusBadge.jsx`
`MetricCard` — `src/components/common/MetricCard.jsx`
`TrendIndicator` — `src/components/common/TrendIndicator.jsx`
`TabBar` — `src/components/common/TabBar.jsx`
`FloatingActionButton` — `src/components/common/FloatingActionButton.jsx`
`LoadingSkeleton` — `src/components/common/LoadingSkeleton.jsx`
`EmptyState` — `src/components/common/EmptyState.jsx`
`ErrorState` — `src/components/common/ErrorState.jsx`

---

## Navigation

Navigator: Stack Navigator (`SupplierNavigator`)
Accessible from: Drawer side menu only (Suppliers item → closes drawer → navigates to `SupplierFlow` Drawer screen)

Screen flow:
```
SelectSupplierScreen
  → SupplierProfileScreen (params: selectedSuppliers[])
    → SupplierDetailScreen (params: supplier{})
      → MetricsDrilldownScreen (params: title, type, supplierId)
    → [back to SelectSupplierScreen] (Edit button, params: preSelectedSuppliers[])
```

---

## Related Modules
- Authentication Module — auth token used for API headers (when real API is connected)
- Attendance Module — shares `FilterModal`, `SearchBar`, `BackButton` components

---

## Dependencies
- `axios` — (configured in API layer, ready for real endpoints)
- `react-native-safe-area-context` — SafeAreaView
- `lucide-react-native` — Building2, Edit, Star, Check, X, TrendingUp, TrendingDown, CheckCircle2, Layers, Trash2, Activity, ArrowUpRight, Inbox, AlertCircle icons

---

## Main Workflows

Single Supplier Selection Flow:
1. User opens Suppliers from Drawer
2. Supplier list loads from API with search/filter support
3. User taps a supplier card → card highlights yellow, Continue FAB appears
4. User taps the same card again → card deselects, FAB disappears
5. User taps Continue FAB → navigates to SupplierProfileScreen

Multi-Supplier Selection Flow:
1. User toggles Multi-Suppliers Select switch ON
2. Cards show checkboxes; user taps multiple cards
3. FAB shows "X Suppliers Selected" with count
4. User taps FAB → navigates to SupplierProfileScreen with all selected suppliers

Product Browsing Flow:
1. SupplierProfileScreen shows blue summary card with chip row
2. Products load and display in a searchable list
3. User taps a product → navigates to SupplierDetailScreen for that supplier

Supplier Detail & Metrics Flow:
1. SupplierDetailScreen opens with Overview tab active
2. Overview tab shows 4 metric sections with progress bars and stat cards
3. User taps drill-down arrow on any metric → MetricsDrilldownScreen
4. User switches tabs (Ranged / De-ranged) to filter products

Edit Selection Flow:
1. User taps Edit button in blue chip row on SupplierProfileScreen
2. Navigates back to SelectSupplierScreen with `preSelectedSuppliers` param
3. Selection state is restored (single-select or multi-select mode, correct IDs highlighted)

---

## Error Handling
- API failure shows `ErrorState` component with Retry button on all data-fetching screens
- Empty list shows `EmptyState` component with Inbox icon and message
- Loading state shows `LoadingSkeleton` shimmer rows while data is fetching

---

## Important Business Rules
- Supplier module is accessible from the Drawer side menu ONLY — not from the bottom tab bar
- In single-select mode, tapping a selected card deselects it (toggle behaviour)
- Continue FAB is invisible until at least one supplier is selected
- Multi-select mode and single-select mode are mutually exclusive; switching modes resets all selections
- SupplierCard shows yellow/amber highlight for both star-favourited suppliers AND single-selected suppliers
- Edit button on SupplierProfileScreen navigates back with pre-selected suppliers to allow changing the selection without losing context
- `SupplierNavigator` is mounted as a `Drawer.Screen` (not inside BottomTabNavigator) so back navigation pops the stack correctly

---

## Future Improvements
- Connect to real backend API endpoints in `supplierService.js`
- Add pagination for large supplier lists
- Add supplier search by product category
- Add offline caching for frequently viewed supplier metrics
- Add export / share functionality for metric drill-downs
