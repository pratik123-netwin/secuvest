Module Name: Attendance

Build all Attendance module screens for the Secuvest React Native app.

Screens to build:

1. Store Selection Screen
   - Search bar (filter list in real time)
   - API call: GET /stores
   - "Favorite Stores" section (with distance/tags)
   - "Other Stores" section (with star icon to add to favorites)
   - Favorite logic: toggle and persist to AsyncStorage + API call

2. Filter & Sorting Bottom Sheet
   - Modal bottom sheet UI
   - Dropdowns: Retailer, Region, Sort By (A-Z)
   - API calls: GET /retailers, GET /regions
   - Toggle: "Favorites Only"
   - Apply Filters logic

3. Location Verification Screen
   - "Checking Location..." loading UI
   - Use react-native-geolocation-service to get device GPS
   - Compare device coords with selected store coords (haversine formula)
   - If within range → on-site, else → away
   - API call to log location check

4. Store Action Options Screen
   - API call: GET /stores/:id
   - Selected store detail card
   - Dynamic location status badge: "On-site" or "Away"
   - Primary button: "Clock In (On-Site)" or "Clock In (Offline Visit)" based on status

5. Confirm Clock In Screen
   - Read-only store details (Type, Date, Time)
   - "Confirm Clock In" button → API call POST /attendance/clock-in

6. Active Session / Success Screen
   - "Clocked In Successfully!" UI
   - Running timer component (HH:MM:SS) using useEffect + setInterval
   - Store detail summary card
   - "Return to Home" button

Store in: src/screens/Attendance/
Services in: src/services/attendanceService.jsx

- React Native CLI with Javascript
