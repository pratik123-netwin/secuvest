# Module: Onboarding

## Module Overview
The single welcome screen shown to unauthenticated users when the app first opens. Introduces the Secuvest GO brand, highlights three core value propositions, and routes the user to either Login or Signup.

---

## Module Responsibilities
- Display the Secuvest GO hero card with brand name and tagline
- Present three feature highlights (Quick Actions, Secure, Intuitive)
- Provide navigation entry points to Login and Signup flows

---

## Key Screens

OnboardingScreen
`src/screens/Onboarding/OnboardingScreen.jsx`
Full-screen branded welcome with hero card, feature list, and Sign In / Create Account buttons

---

## API Endpoints Used
None — this screen is entirely static.

---

## State Management
No local state or Redux usage. No AsyncStorage usage.

---

## Reusable Components Used
None — the screen uses only inline styled `View` and `Text` primitives with `TouchableOpacity` buttons.

---

## Navigation

Navigator: Stack Navigator — managed by root `AppNavigator`
Accessible from: App launch when no valid auth token is found in AsyncStorage

Screen flow:
```
OnboardingScreen
  → LoginStep1 (via "Sign In" button)
  → Signup (via "Create new account" button)
```

---

## Related Modules
- Authentication Module — Onboarding is the entry point into the auth flow

---

## Dependencies
- `react-native-safe-area-context` — SafeAreaView
- `lucide-react-native` — Zap, Shield, Settings, Snowflake feature icons

---

## Main Workflows

First Launch Flow:
1. App checks AsyncStorage for a valid token
2. No token found → OnboardingScreen shown
3. User taps "Sign In" → navigates to LoginStep1
4. User taps "Create new account" → navigates to Signup

---

## Error Handling
No error handling needed — static screen with no API calls.

---

## Important Business Rules
- OnboardingScreen is only shown when the user is not authenticated
- Once authenticated (token exists in AsyncStorage), app navigates directly to Home bypassing Onboarding

---

## Future Improvements
- Add scrollable multi-page onboarding carousel with feature animations
- Add "Skip" option to jump directly to login
