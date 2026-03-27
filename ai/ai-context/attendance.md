# Module: Attendance

## Module Overview
GPS-based geofencing attendance module that allows field staff to clock in and out of assigned stores. Verifies physical proximity using the Haversine formula before allowing a clock-in. Tracks session duration in AsyncStorage and supports a break management flow leading to clock-out.

---

## Module Responsibilities
- List available stores with search, filter, and star-favourite support
- Verify user GPS location against store coordinates (Haversine geofencing)
- Display clock-in action options (Clock In, View Details)
- Confirm clock-in details before committing
- Track live session duration on an active session screen
- Manage break sessions and record break start/end
- Confirm and execute clock-out
- Show a success screen after clock-out

---

## Key Screens

StoreSelectionScreen
`src/screens/Attendance/StoreSelectionScreen.jsx`
Searchable, filterable store list with star-favourite toggling. Favourite IDs persisted in AsyncStorage. Tapping a store navigates to LocationVerification.

LocationVerificationScreen
`src/screens/Attendance/LocationVerificationScreen.jsx`
Requests GPS permission, fetches live coordinates, computes distance to store using Haversine formula, animates a forward-only progress bar (10s timeout), navigates to StoreActionOptions on success or shows retry on failure. Uses `useFocusEffect` to restart verification on every navigation focus.

StoreActionOptionsScreen
`src/screens/Attendance/StoreActionOptionsScreen.jsx`
Displays store details and presents Clock In and View Store Details actions. Uses `useFocusEffect` to refresh active session state from AsyncStorage.

ConfirmClockInScreen
`src/screens/Attendance/ConfirmClockInScreen.jsx`
Shows store summary and confirmation prompt before executing clock-in. Calls `clockIn` API and writes `active_session` to AsyncStorage on success.

ActiveSessionScreen
`src/screens/Attendance/ActiveSessionScreen.jsx`
Displays live elapsed timer for the current session, store info card, and a Start Break / Clock Out flow entry point. Reads store and session params from navigation.

BreakManagementScreen
`src/screens/Attendance/BreakManagementScreen.jsx`
Allows staff to start and end breaks during an active session. Navigates to ConfirmClockOut when ready to clock out.

ConfirmClockOutScreen
`src/screens/Attendance/ConfirmClockOutScreen.jsx`
Shows session summary (store, duration) and prompts user to confirm clock-out action.

ClockOutSuccessScreen
`src/screens/Attendance/ClockOutSuccessScreen.jsx`
Post-clock-out success screen showing session duration and confirmation. Clears `active_session` from AsyncStorage and navigates back to Home.

---

## API Endpoints Used

GET /api/stores
Fetch list of all stores
Auth Required: Yes
Service: `src/services/attendanceService.jsx`

GET /api/retailers
Fetch list of retailers for filter modal
Auth Required: Yes
Service: `src/services/attendanceService.jsx`

GET /api/regions
Fetch list of regions for filter modal
Auth Required: Yes
Service: `src/services/attendanceService.jsx`

GET /api/stores/:id
Fetch individual store details including lat/lng for geofencing
Auth Required: Yes
Service: `src/services/attendanceService.jsx`

POST /api/location/log
Log location check result (success/failure/distance)
Auth Required: Yes
Service: `src/services/attendanceService.jsx`

POST /api/attendance/clock-in
Record clock-in event with store and GPS data
Auth Required: Yes
Service: `src/services/attendanceService.jsx`

> Note: All endpoints are currently mocked in `attendanceService.jsx`.

---

## State Management

Local State:

StoreSelectionScreen:
- `stores` — full store list from API
- `favorites` — array of favourite store IDs
- `loading` — loading indicator
- `searchQuery` — live search filter text
- `showFilters` — controls FilterModal visibility
- `retailers`, `regions` — dropdown options for filter modal
- `selectedRetailer`, `selectedRegion` — active filter values
- `sortAZ`, `favoritesOnly` — sort and filter toggle states

LocationVerificationScreen:
- `storeName` — fetched store name for display
- `errorMsg` — shown when GPS fails or distance check fails
- `progressAnim` — `Animated.Value` driving the forward-only progress bar

StoreActionOptionsScreen:
- `store` — store object fetched fresh on focus
- `hasActiveSession` — boolean read from AsyncStorage on focus

ActiveSessionScreen:
- `secondsElapsed` — integer ticker running via `setInterval` every 1 second

Redux:
- None used directly in Attendance screens

AsyncStorage:
- `favorite_stores` — JSON array of starred store IDs persisted by StoreSelectionScreen
- `active_session` — JSON object `{ store, startTime }` written by ConfirmClockInScreen; read by HomeScreen and StoreActionOptionsScreen; cleared by ClockOutSuccessScreen

---

## Reusable Components Used

`BackButton` — `src/components/BackButton.jsx`
`SearchBar` — `src/components/SearchBar.jsx`
`FilterModal` — `src/components/FilterModal.jsx`
`StoreCard` — `src/components/StoreCard.jsx`
`StoreInfoCard` — `src/components/StoreInfoCard.jsx`
`CustomButton` — `src/components/CustomButton.jsx`

---

## Navigation

Navigator: Stack Navigator (`AttendanceNavigator`)
Accessible from: Clock tab in bottom navigation bar, OR Attendance item in Drawer menu (routes to Clock tab)

Screen flow:
```
StoreSelectionScreen
  → LocationVerificationScreen (params: storeId)
    → StoreActionOptionsScreen (params: storeId)
      → ConfirmClockInScreen (params: store)
        → ActiveSessionScreen (params: store, status)
          → BreakManagementScreen (params: store)
            → ConfirmClockOutScreen (params: store, sessionStart)
              → ClockOutSuccessScreen (params: duration)
                → [HomeScreen via navigation.reset]
```

---

## Related Modules
- Home Module — reads `active_session` AsyncStorage key to display Shift Continue card
- Authentication Module — auth token used for API headers (when real API is connected)

---

## Dependencies
- `react-native-geolocation-service` — GPS coordinates
- `@react-native-async-storage/async-storage` — session and favourites persistence
- `@react-navigation/native` — `useFocusEffect`
- `react-native-safe-area-context` — SafeAreaView
- `lucide-react-native` — MapPin, Building, Star, Check icons

---

## Main Workflows

Clock-In Flow:
1. User opens Attendance from Drawer or Clock tab
2. Store list loads with search/filter support
3. User stars favourites (persisted to AsyncStorage)
4. User taps a store → LocationVerificationScreen
5. GPS permission requested → coordinates fetched
6. Haversine distance computed vs store lat/lng
7. If within range → StoreActionOptionsScreen
8. User taps Clock In → ConfirmClockInScreen
9. User confirms → `clockIn()` API called → `active_session` saved to AsyncStorage
10. ActiveSessionScreen shown with live elapsed timer

Clock-Out Flow:
1. User on ActiveSessionScreen taps Clock Out
2. BreakManagementScreen shown (break management optional)
3. User taps Proceed to Clock Out → ConfirmClockOutScreen
4. User confirms → `active_session` cleared from AsyncStorage
5. ClockOutSuccessScreen shown with session duration
6. User taps Done → navigates back to HomeScreen

---

## Error Handling
- GPS permission denied → error message shown on LocationVerificationScreen with Retry button
- GPS timeout / network error → `errorMsg` state shown with Retry option
- Store not found → error thrown and caught in LocationVerificationScreen
- `useFocusEffect` used instead of `useEffect` on LocationVerification and StoreActionOptions to prevent stale state when navigating back within the Drawer/Tab context

---

## Important Business Rules
- Location must be verified (within geofence radius) before the clock-in option is shown
- Progress bar on LocationVerificationScreen moves forward only — never resets or reverses
- Only one active session can exist at a time (AsyncStorage `active_session` key)
- Favourite stores are stored by ID array and visually highlighted in the store list
- The entire Attendance flow is nested inside `AttendanceNavigator` (Stack) which lives inside the Clock tab — this ensures the bottom navigation bar remains visible throughout the flow

---

## Future Improvements
- Connect to real backend API endpoints
- Add geofence radius configuration per store
- Add break duration tracking and reporting
- Add offline support with queue for clock-in/out when no network is available
