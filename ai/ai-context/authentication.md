# Module: Authentication

## Module Overview
Handles user identity across the Secuvest React Native app — login, signup, OTP verification, and password reset. Uses a 2-step login flow (email/phone → password) followed by OTP verification to authenticate and restore a session token.

---

## Module Responsibilities
- Accept user email/phone on a dedicated first login step
- Accept password and "Remember me" option on a second login step
- Collect full signup form (name, DOB, gender, email/phone, password)
- Verify identity via 4-digit OTP sent to email/phone
- Handle password reset via forgot-password flow
- Dispatch Redux auth actions to persist session token
- Store JWT token and user object in AsyncStorage on success

---

## Key Screens

LoginStep1
`src/screens/auth/LoginStep1.jsx`
First step of login — collects email address or phone number and validates format before advancing

LoginStep2
`src/screens/auth/LoginStep2.jsx`
Second step of login — shows the identifier as read-only, accepts password, handles Remember Me checkbox, dispatches login action to Redux

OTPVerification
`src/screens/auth/OTPVerification.jsx`
4-digit OTP entry screen with auto-submit on last digit, 60-second resend countdown, stores token and user to AsyncStorage on success

Signup
`src/screens/auth/Signup.jsx`
Full registration form — name, date of birth (day/month/year), gender picker, email/phone, password. On submit navigates to OTPVerification

ForgotPassword
`src/screens/auth/ForgotPassword.jsx`
Collects email/phone to trigger password reset flow

---

## API Endpoints Used

POST /api/auth/login
Authenticate user with email/phone and password
Auth Required: No
Service: `src/services/authService.js`

POST /api/auth/otp/verify
Verify 4-digit OTP code
Auth Required: No
Service: `src/services/authService.js`

POST /api/auth/signup
Register new user account
Auth Required: No
Service: `src/services/authService.js`

POST /api/auth/forgot-password
Trigger password reset email/SMS
Auth Required: No
Service: `src/services/authService.js`

> Note: All endpoints are currently mocked with Promise timeouts. Real API base URL is configured in `src/services/api.js`.

---

## State Management

Local State:
- `emailOrPhone` — controlled input for identifier on LoginStep1
- `password` — controlled input for password on LoginStep2
- `rememberMe` — boolean checkbox state on LoginStep2
- `otp` — array of 4 single-digit strings in OTPVerification
- `timer` — countdown integer (60→0) for OTP resend
- `loading` — tracks async operation in progress
- `error` / `errors` — validation and API error strings per screen
- `form` — consolidated object for all Signup fields
- `showGenderPicker` — controls gender picker visibility on Signup

Redux:
- `authSlice` — dispatches `login()` action from LoginStep2; dispatches `restoreToken()` after OTP success; reads `loading` and `error` from auth state

AsyncStorage:
- `token` — JWT token stored after successful OTP verification
- `user` — JSON-stringified user object stored after successful OTP verification

---

## Reusable Components Used

`CustomInput` — `src/components/CustomInput.jsx`
`CustomButton` — `src/components/CustomButton.jsx`
`BackButton` — `src/components/BackButton.jsx`

---

## Navigation

Navigator: Stack Navigator — managed by the root `AppNavigator`
Accessible from: App launch (not authenticated) or direct navigation from Onboarding

Screen flow:
```
OnboardingScreen
  → LoginStep1
    → LoginStep2 (params: emailOrPhone)
      → OTPVerification (params: emailOrPhone)
        → [Home via Redux auth state change]
      → ForgotPassword (params: emailOrPhone)
    → Signup
      → OTPVerification (params: emailOrPhone)
```

---

## Related Modules
- Onboarding Module — Onboarding navigates into LoginStep1
- Home Module — after successful auth, Redux state change triggers navigation to Home

---

## Dependencies
- `react-redux` — Redux dispatch and selector
- `@react-native-async-storage/async-storage` — token and user persistence
- `react-native-safe-area-context` — SafeAreaView
- `react-native-keyboard-controller` — KeyboardAwareScrollView
- `lucide-react-native` — User, ShieldCheck, Check icons

---

## Main Workflows

Two-step Login Flow:
1. User enters email or phone on LoginStep1
2. Local validation runs (format check)
3. App navigates to LoginStep2 passing emailOrPhone
4. User enters password with optional Remember Me toggle
5. Redux `login()` dispatched with credentials
6. On success, auth state changes and app navigates to Home

OTP Verification Flow:
1. User arrives from Signup or direct OTP trigger
2. User enters 4 digits — last digit triggers auto-submit
3. `verifyOtpAPI()` called with joined code
4. On success, token and user saved to AsyncStorage
5. `restoreToken` dispatched to Redux — app navigates to Home

Signup Flow:
1. User fills name, DOB fields, gender, email/phone, password
2. All fields validated on submit
3. Signup API called (simulated)
4. On success, navigates to OTPVerification

---

## Error Handling
- Field-level validation errors displayed inline below each input via `CustomInput` error prop
- Auth API errors from Redux `authError` state shown on LoginStep2
- OTP mismatch shows inline "Invalid OTP" error
- Loading state disables button and shows spinner via `CustomButton` loading prop

---

## Important Business Rules
- Login is split into two steps — identifier must be validated before password screen is shown
- OTP auto-submits when all 4 digits are filled
- Resend OTP is disabled for 60 seconds after trigger
- Signup always redirects to OTP verification (not directly to Home)

---

## Future Improvements
- Replace mock API with real backend endpoints in `authService.js`
- Add biometric login (Face ID / fingerprint) option
- Add token refresh logic for expired sessions
