# Module: Home

## Module Overview
The main dashboard screen shown after login. Displays a personalised greeting, a dynamic attendance action card (Start Shift or Shift Continue depending on active session state), and quick-access shortcut buttons to key modules.

---

## Module Responsibilities
- Greet the authenticated user by name
- Detect and display an active session from AsyncStorage on every focus event
- Show Shift Continue card (green) if a session is active, or Start Shift card (blue) if not
- Display elapsed time for the active session updated every 60 seconds
- Provide shortcut navigation buttons to Attendance and other modules
- Open the side Drawer menu via a dedicated icon

---

## Key Screens

HomeScreen
`src/screens/Home/HomeScreen.jsx`
Dashboard with greeting, dynamic action card, and module shortcut buttons

---

## API Endpoints Used
None — Home reads session state from AsyncStorage only. No network calls.

---

## State Management

Local State:
- `activeSession` — parsed JSON object from AsyncStorage `active_session` key; `null` if no session
- `elapsedText` — formatted elapsed time string (e.g. `2h 15m`) computed from session `startTime`

Redux:
- `authSlice` — reads `user` object to display personalised greeting (name or email prefix)

AsyncStorage:
- `active_session` — read on every screen focus; parsed to determine if a shift is currently active

---

## Reusable Components Used
No shared components from `src/components/common/` — uses inline `View`, `Text`, `TouchableOpacity` with lucide icons.

---

## Navigation

Navigator: Bottom Tab Navigator (Home tab)
Accessible from: root Bottom Tab bar (Home icon)

Shortcut navigations triggered from Home:
```
HomeScreen
  → Clock tab → StoreSelectionScreen (Start Shift shortcut, no active session)
  → Clock tab → BreakManagementScreen (Shift Continue shortcut, session active)
  → Drawer opens (via menu icon press)
```

---

## Related Modules
- Attendance Module — Home shortcuts navigate into the Attendance flow
- Authentication Module — reads Redux `authSlice` for user display name

---

## Dependencies
- `react-redux` — reads `user` from `authSlice`
- `@react-native-async-storage/async-storage` — reads `active_session`
- `@react-navigation/native` — `useFocusEffect` for session refresh on focus
- `react-native-safe-area-context` — SafeAreaView
- `lucide-react-native` — Bell, AlarmClock, ChevronRight, User, CheckCircle icons

---

## Main Workflows

Active Session Detection:
1. Screen receives focus (via `useFocusEffect`)
2. `active_session` key read from AsyncStorage
3. If found → parse JSON → compute elapsed time → show green Shift Continue card
4. If not found → show blue Start Shift card
5. Timer runs every 60 seconds to refresh elapsed display

Start Shift Flow (shortcut):
1. User taps Start Shift card → navigates to `Clock` tab → `StoreSelection` screen

Shift Continue Flow (shortcut):
1. User taps Shift Continue card → navigates to `Clock` tab → `BreakManagement` screen

---

## Error Handling
- AsyncStorage read wrapped in try/catch — silent failure (does not show an error to the user)
- If user data is missing from Redux, falls back to default display name `'Olivia'`

---

## Important Business Rules
- The action card is mutually exclusive: either Start Shift or Shift Continue is shown, never both
- Elapsed time is refreshed every 60 seconds while the screen is in focus, not every second
- The session check runs on every screen focus — ensures the card updates after the user returns from clocking out

---

## Future Improvements
- Add notification bell with unread count badge
- Add a recent activity feed
- Add quick-launch shortcuts to Supplier and other completed modules
