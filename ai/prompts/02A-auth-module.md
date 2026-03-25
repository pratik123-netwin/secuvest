We are starting development of a module in this React Native project.

Module Name: Authentication

If a file ai-context/authentication.md already exists, read it and summarize the module. Verify if it matches the current implementation.

We need to build the following screens:

1. Login Step 1 — Email/Phone input, Continue button, validation, API call
2. Login Step 2 — Password input, show/hide, Remember Me, Forgot Password, Login button, API call
3. Signup Screen — Name, DOB (DatePicker), Gender (Dropdown), Email/Phone, Password, Submit, Validation, API call
4. OTP Verification — Enter OTP, countdown timer, Resend button, API call, loading state
5. Forgot Password — Email/Phone input, Send button, API call

Tech requirements:
- React Native CLI + Javascript
- Functional components with hooks
- React Navigation Stack navigator
- Axios for API calls
- Redux Toolkit for auth state (token, user profile)
- AsyncStorage to persist auth token
- Form validation (no library needed, keep it simple)

Please generate all screens one by one. Start with the file structure, then each screen component. Follow existing project architecture.