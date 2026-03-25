# Home & Navigation Module

## Architecture Overview
The application uses React Navigation, structured via a root `DrawerNavigator` hosting an initial `BottomTabNavigator`. The `BottomTabNavigator` manages core screens, while the `DrawerNavigator` manages overarching utility views, profiles, and logout.

## Key Navigators & Screens
- **`AppNavigator.jsx`**: Bootstraps navigation. Dynamically mounts the `DrawerNavigator` framework exclusively upon verifying an active Redux authenticated token block; fallback is `AuthNavigator`. Includes `react-native-gesture-handler` top-level initialization block.
- **`DrawerNavigator.tsx`**: The logged-in shell template. Constructs a custom `DrawerContentScrollView`. Injects the Secuvest logo header natively. Lists active views (Home, Attendance, Suppliers, Products, Profile) and statically mocked "Soon" badged views (Settings, Notifications, Help). Serves a rigid Bottom-Anchored UI block resolving Redux `logout`. Currently has no `Submit Feedback` item (removed per design).
- **`BottomTabNavigator.tsx`**: Renders `<Tab.Navigator>`. Tracks Home and Attendance components strictly via React states using `Lucide` iconography. Intelligently traps the `Menu` tab execution (`listeners`) and suppresses the stack push to cleanly invoke `navigation.openDrawer()`.
- **`HomeScreen.tsx`**: Serves as the first mounted dashboard under tabs. Resolves Redux `auth.user` metrics generically. Houses a centered dynamic bounding box and standard `<CustomButton>` dispatch invoking a contextual jump to `StoreSelection`. Specifically excludes global notification/bell logic from the header bar natively per latest design.

## Implementation Details
- Strictly leverages TypeScript `.tsx` typing frameworks on all logic paths.
- Consumes components manually out of `src/components` and generic global color definitions via `src/constants/colors.js`.
- Binds `images.js` strictly to fetch contextual image assets across drawer templates properly.

## UI Design Tokens

### Typography:
- Header Greeting Name: fontSize: 20, fontWeight: 'bold'
- Map / Nav Labels: Drawer Menu Text: fontSize: 14, fontWeight: '500'
- Section Titles: Drawer Label marginLeft: 12, marginBottom: 8, fontSize: 12, fontWeight: '600', color: '#6B7280'
- Footer Link: Drawer Logout Text: fontSize: 14, fontWeight: '600', color: '#DC2626'

### Spacing:
- Screen horizontal padding: 20
- Section vertical spacing: Drawer header paddingTop is 10
- Drawer Items padding: paddingVertical: 8
- Drawer Section Margin: height: 12

### Component Sizes:
- Drawer Logo bounds: width: 28, height: 28
- Footer Action bounds: height: 44, borderRadius: 22
