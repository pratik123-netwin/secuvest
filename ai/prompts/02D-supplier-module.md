We are starting development of the Supplier module 
for the Secuvest React Native app.

---

Module Name: Supplier

Store all screens in: src/screens/Supplier/
Store all API calls in: src/services/supplierService.js
Store all reusable components in: src/components/common/

---

Tech Requirements:
- React Native CLI with JavaScript (not TypeScript)
- Functional components with hooks
- React Navigation Stack navigator
- Axios for API calls
- lucide-react-native for all icons
- react-native-safe-area-context for SafeAreaView
- react-native-keyboard-controller for keyboard handling
- Do NOT use react-native-vector-icons

---

Component Rules — IMPORTANT:
Whenever a UI element is used more than once across 
any screen in this module or could be reused in other 
modules, always create it as a separate reusable 
component inside src/components/common/.

Examples of things that must be a reusable component:
- Supplier card
- Product card
- Status badge (In Stock, Out of Stock, Active, Inactive)
- Metric summary card
- Trend indicator (up/down arrow with value)
- Search bar
- Filter bottom sheet
- Checkbox component
- Supplier chip (for selected supplier horizontal scroll)
- Floating action button
- Tab bar (Overview / Products)
- Section header
- Empty state view (when list has no results)
- Loading skeleton for list items
- Error state view with retry button

Each reusable component must:
- Accept props for all dynamic values
- Have its own StyleSheet
- Be stored in src/components/common/
- Be imported into screens rather than duplicated

---

Screens to build:

Screen 1 — Select Supplier Screen:
- API call: GET /suppliers
- Search bar with real-time filtering (use SearchBar component)
- Toggle switch for single-select and multi-select mode
- In multi-select mode show checkboxes on supplier cards
- Track all selected supplier IDs in local state
- Floating action button showing "X Suppliers Selected"
  only visible when at least one supplier is selected
- Single tap on a supplier card navigates to Supplier Profile screen
- Use SupplierCard as a reusable component
- Use FloatingActionButton as a reusable component

Screen 2 — Supplier Filters Bottom Sheet:
- Reuse the FilterBottomSheet component from Attendance module
  if it already exists, otherwise create it in src/components/common/
- Dropdowns: Quick Filters, Region, Sort Order
- Apply Filters button updates the supplier list

Screen 3 — Supplier Profile: Header and Product List:
- API call: GET /suppliers/:id
- Supplier detail header card (Name, ID, Status badge)
- Horizontal scroll of selected supplier chips
  use SupplierChip as a reusable component
- Supplier product list using ProductCard reusable component
- Top tab navigation with two tabs: Overview and Products
  use a reusable TabBar component

Screen 4 — Supplier Profile Overview Tab:
- API call: GET /suppliers/:id/metrics
- Grid of metric summary cards:
  Article Performance, Stock Health, Sales Metrics, Message Tracking
- Use MetricCard as a reusable component
- Each MetricCard shows: title, value, trend indicator
- Use TrendIndicator as a reusable component
  showing up or down arrow with percentage or value
- Tapping a MetricCard navigates to Metrics Drill-down screen

Screen 5 — Supplier Profile Products Tab:
- API call: GET /suppliers/:id/products
- Search bar using SearchBar reusable component
- Filter bar for this supplier's products
- List of ProductCard reusable components
  each showing image, name, price, and details

Screen 6 — Metrics Drill-down Screen:
- Receives dynamic title and metric type as navigation params
- Tab filters such as Ranged and De-ranged
  use TabBar reusable component
- List items showing product or article name with StatusBadge
- StatusBadge reusable component handles:
  In Stock, Out of Stock, Ranged, De-ranged states
  with different background colors per status


---

Build screen by screen. 
Show the complete file for each screen and each 
new reusable component created.
After all screens are done show the complete 
supplierService.js file.