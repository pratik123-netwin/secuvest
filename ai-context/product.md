# Module: Products

## Module Overview

The Products module provides staff users with a full catalogue view of all products stocked or ranged by the organisation. It supports real-time search, category/supplier filtering, multi-select mode for batch operations, and a detailed product profile broken into three focused tabs (Overview, Stock, Details). The supplier link on the Details tab bridges directly into the Supplier module.

---

## Module Responsibilities

* Display a searchable, filterable list of all products
* Support multi-select mode for batch product operations
* Show per-product detail: stock status, range status, sales performance, order & receipt history, and product information
* Provide a direct navigation link from a product to its supplier profile

---

## Key Entities

**Product**
Fields: `id`, `name`, `articleNo`, `barcode`, `price`, `category`, `supplierName`, `supplierId`, `image`, `status` (Ranged / De-ranged), `stockStatus` (In Stock / Low Stock / Out of Stock), `rangeStatus` (On Range / De-ranged), `currentStock`, `reorderLevel`, `lastRestocked`, `rateOfSale`, `lastSold`, `lastOrderDate`, `lastOrderQty`, `lastReceiptDate`, `lastReceiptQty`, `orderStatus`, `articleNumber`, `lastUpdated`

---

## API Endpoints

> **Note:** Currently backed by `productService.js` mock data. Replace with real API calls when the backend is available.

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/products` | Fetch full product list | Yes |
| GET | `/products/:id` | Fetch single product details | Yes |
| GET | `/products/categories` | Fetch distinct category list for filter | Yes |
| GET | `/products/suppliers` | Fetch distinct supplier name list for filter | Yes |

---

## Database Tables

> Handled server-side. Client consumes API responses only.

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `products` | Stores all product records | `id`, `name`, `articleNo`, `price`, `status`, `supplierId` |
| `product_categories` | Category lookup | `id`, `name` |
| `suppliers` | Supplier reference (shared with Supplier module) | `id`, `name` |

---

## Navigation

**Entry point:** Drawer → "Products" → `ProductsFlow`

```
DrawerNavigator
  └── ProductsFlow (ProductsNavigator — Stack)
        ├── ProductList      ← initial route
        └── ProductDetail
              ├── ProductOverviewTab  (default)
              ├── ProductStockTab
              └── ProductDetailsTab
                    └── → SupplierFlow / SupplierProfile  (cross-module)
```

**Back navigation:** `ProductList` back button navigates to `RootTabs → Home`.

---

## Screens

### `ProductListScreen`
- Loads products, categories, and supplier names in parallel on focus
- Real-time search filter on `name` and `articleNo`
- Category and Supplier dropdowns via `FilterModal` (labels: "Categories" / "Suppliers")
- A–Z sort toggle
- **Multi-Select Mode:** `Switch` toggles multi-select; `Checkbox` appears on the right of each card; `FloatingActionButton` shows selected count
- Navigates to `ProductDetail` on card tap (or toggles selection in multi-select mode)

### `ProductDetailScreen`
- Loads product by `productId` route param
- **Header card:** `LinearGradient` (`#247A4D → #065240`), product image (rounded square), name, article#, supplier pill (tappable → `SupplierProfile`)
- `TabBar` with three tabs: Overview | Stock | Details

### `ProductOverviewTab`
- Two `StatusCard` components side-by-side: **Stock Status** (In Stock=green, Low Stock=amber, Out of Stock=red) and **Range Status** (On Range=green, De-ranged=red)
- **Sales Performance** info card: Rate of Sale, Last Sold

### `ProductStockTab`
- **Order & Receipt History** info card: Last Order Date, Last Order Quantity, Last Receipt Date, Last Receipt Quantity, Order Status
- **Stock Information** card: current stock units

### `ProductDetailsTab`
- **Product Information** card: Barcode, Article Number, Last Updated, Price
- **Supplier card:** tappable row with `Building2` icon (blue background), supplier name → navigates to `SupplierProfile`

---

## Reusable Components Used

| Component | Location | Purpose |
|-----------|----------|---------|
| `ProductCard` | `src/components/common/ProductCard.jsx` | Product list card (supports multi-select via `isMultiSelect` / `isSelected` / `onToggleSelect`) |
| `StatusCard` | `src/components/common/StatusCard.jsx` | Coloured status summary card (auto green/amber/red from value); used in ProductOverviewTab and reusable across modules |
| `FilterModal` | `src/components/FilterModal.jsx` | Bottom sheet filter; uses `retailerLabel="Categories"` / `regionLabel="Suppliers"` for this module |
| `SearchBar` | `src/components/SearchBar.jsx` | Search input with filter button |
| `TabBar` | `src/components/common/TabBar.jsx` | Overview / Stock / Details tab switcher |
| `Checkbox` | `src/components/common/Checkbox.jsx` | Multi-select checkbox |
| `FloatingActionButton` | `src/components/common/FloatingActionButton.jsx` | Selected count action button |
| `BackButton` | `src/components/BackButton.jsx` | Back navigation |
| `LoadingSkeleton` | `src/components/common/LoadingSkeleton.jsx` | Loading state |
| `EmptyState` | `src/components/common/EmptyState.jsx` | Empty list state |
| `ErrorState` | `src/components/common/ErrorState.jsx` | Error + retry state |

---

## Related Modules

- **Supplier Module** — `ProductDetailsTab` navigates to `SupplierProfile` via `SupplierFlow`. `ProductCard` is shared between both modules.
- **Home Module** — Products back button returns to `RootTabs → Home`

---

## Dependencies

| Library | Usage |
|---------|-------|
| `@react-navigation/stack` | `ProductsNavigator` stack |
| `@react-navigation/native` (`useFocusEffect`) | Reload data on screen focus |
| `react-native-linear-gradient` | Green header card on `ProductDetailScreen` |
| `lucide-react-native` | All icons (CheckCircle2, XCircle, AlertTriangle, Layers, Building2, ExternalLink, Package) |
| `react-native-safe-area-context` | Safe area layout |

---

## Main Workflows

### Browse & Search Products
1. User opens drawer → taps **Products**
2. `ProductListScreen` loads all products + categories + supplier names
3. User types in `SearchBar` → list filters in real time by name / article#
4. User taps filter icon → `FilterModal` opens with **Categories** and **Suppliers** dropdowns
5. User applies filters → list updates

### Multi-Select
1. User toggles **Multi-Products Select** switch ON
2. Cards show a `Checkbox` on the right; tapping a card or checkbox toggles selection
3. `FloatingActionButton` appears at bottom showing "X Products Selected"
4. User toggles switch OFF → selection is cleared

### View Product Details
1. User taps a product card → navigates to `ProductDetailScreen`
2. Green gradient header card shows product name, article#, and supplier pill
3. Default tab is **Overview**: shows Stock Status / Range Status cards + Sales Performance rows
4. **Stock** tab: shows order & receipt history + current stock
5. **Details** tab: shows product information rows + tappable supplier link

### Navigate to Supplier
1. From `ProductDetailScreen` header pill **or** from the **Details** tab supplier card
2. App navigates to `SupplierFlow → SupplierProfile` passing `{ id, name }` params

---

## Business Rules

- Stock Status drives card colour: **In Stock** → green, **Low Stock** → amber, **Out of Stock** → red
- Range Status drives card colour: **On Range** (or "Ranged") → green, **De-ranged** → red
- Multi-select is a UI-only mode; no server action is triggered currently (placeholder for batch operations)
- Filter modal for Products does **not** show Favourites toggle (`showFavorites={false}`)
- Products are accessible via **Drawer only** — not in the Bottom Tab bar

---

## Security Considerations

- All product data endpoints require authenticated sessions (JWT token from Auth module)
- Role: Staff users can view all product data; no create/update/delete from mobile

---

## Future Improvements

- Replace mock `productService.js` with real REST API calls
- Implement batch actions for multi-select (e.g. export, mark for review)
- Add product image support (currently renders a placeholder)
- Add barcode scanner entry point from `ProductListScreen`
- Sync `StatusCard` colour logic with a server-driven status enum for consistency
