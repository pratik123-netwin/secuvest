# Module: Profile

## Module Overview

The Profile module provides authenticated staff users with a read-only view of their personal account information. It displays the user's avatar (initials-based), name, role, and all key contact/account fields sourced directly from the Redux auth state populated at login.

---

## Module Responsibilities

* Display user identity: name, role, initials avatar
* Show contact information: Email, Phone, Location, Department, Member Since
* Read user data from Redux `auth.user` — no additional API calls on this screen

---

## Key Entities

**User**
Fields consumed: `name`, `role`, `email`, `phone`, `location`, `department`, `memberSince`
Source: `state.auth.user` (Redux, populated from login API response and persisted via AsyncStorage)

---

## API Endpoints

> No dedicated API calls from this screen. All data is read from Redux state populated during login.

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|--------------|
| (inherited) | `/auth/login` | Populates `user` object in Redux | N/A |

---

## Database Tables

> Server-side only. Client reads from Redux state.

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | Stores user account records | `id`, `name`, `role`, `email`, `phone`, `location`, `department`, `memberSince` |

---

## Navigation

**Entry point:** Drawer → "Profile" → `ProfileFlow`

```
DrawerNavigator
  └── ProfileFlow (ProfileScreen — single screen, no nested stack)
```

**Back navigation:** Back button → `RootTabs → Home`

---

## Screens

### `ProfileScreen`
- Reads `state.auth.user` from Redux via `useSelector`
- Falls back to sensible placeholder values if fields are missing
- **Dark gradient profile card** (`LinearGradient #2B2B2B → #141414`): circular initials avatar + name + role
- **Contact Information section**: five `ProfileInfoRow` entries — Email, Phone, Location, Department, Member Since
- No tabs, no Performance Metrics (out of scope)

---

## Reusable Components Used

| Component | Location | Purpose |
|-----------|----------|---------|
| `ProfileInfoRow` | `src/components/common/ProfileInfoRow.jsx` | Icon + label + value row card; reusable across any info-list screen |
| `BackButton` | `src/components/BackButton.jsx` | Back navigation |

---

## State Managed

| Slice | Field | Usage |
|-------|-------|-------|
| `auth` | `user` | Source of all displayed profile data |

No local state mutations. This is a pure read screen.

---

## Related Modules

- **Authentication Module** — provides the `auth.user` object that this screen consumes
- **Home Module** — back button returns here

---

## Dependencies

| Library | Usage |
|---------|-------|
| `react-redux` (`useSelector`) | Read `auth.user` from Redux store |
| `react-native-linear-gradient` | Dark gradient profile card |
| `lucide-react-native` | Contact info icons (Mail, Phone, MapPin, Building2, Calendar) |
| `react-native-safe-area-context` | Safe area layout |
| `@react-navigation/drawer` | Registered as `ProfileFlow` drawer screen |

---

## Main Workflows

### View Profile
1. User opens drawer → taps **Profile**
2. `ProfileScreen` mounts, reads `state.auth.user` from Redux
3. Initials are computed from `name` (first + last letter)
4. Dark gradient card renders with name and role
5. Contact Information rows render with icons and values
6. User taps Back → returns to Home

---

## Business Rules

- All profile data is **read-only** on mobile — no edit capability
- Initials avatar is generated from the user's `name` field (first letter of first + last word)
- If a field (e.g. `location`, `department`) is absent from the API response, the row displays `—`
- Screen is accessible via **Drawer only** — not in Bottom Tab bar

---

## Security Considerations

- Screen is only reachable after successful login (auth guard at root navigator level)
- No sensitive data is stored in local component state; all reads are from Redux which mirrors server-authenticated data

---

## Future Improvements

- Add profile photo upload (replace initials with actual avatar image)
- Allow editing of contact fields (phone, location) with PATCH `/users/:id`
- Add logout button shortcut to this screen
- Show account status / verification badge
