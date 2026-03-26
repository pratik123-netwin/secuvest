Module Name: Products

Build all Products module screens for the Secuvest React Native app.

Screens to build:

1. Products List Screen
   - API call: GET /products
   - Search bar (real-time filter)
   - Toggle: Multi-Select mode
   - Product cards: image, name, SKU, price, category tags
   - When multi-select is ON: show checkboxes, floating "X Products Selected" button

2. Products Filter Bottom Sheet
   - Dropdowns: Quick Filters (Categories, Suppliers), Sort By
   - "Apply Filters" logic (reuse bottom sheet component)

3. Product Details Screen
   - API call: GET /products/:id
   - Header card: green background, product image, title, product ID
   - Top tab navigation: Overview | Stock | Details

4. Product Details: Overview Tab
   - Status badges: Stock Status, Range Status
   - Sales Performance list: Highest Sale, Last Sale (label + value rows)

5. Product Details: Stock Tab
   - Order & Receipt History list
   - Stock Information list

6. Product Details: Details Tab
   - Product Information list (Barcode, Article Number, etc.)
   - Supplier link (tappable → navigate to Supplier Profile)

Store in: src/screens/Products/
Services in: src/services/productService.jsx

Use custom commponent for Product card and filter bottom sheet and alos use custom header component

Component Rules — IMPORTANT:
Whenever a UI element is used more than once across 
any screen in this module or could be reused in other 
modules, always create it as a separate reusable 
component inside src/components.


Tech Requirements:
- React Native CLI with JavaScript (not TypeScript)
