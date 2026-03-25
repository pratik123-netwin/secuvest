# Project Structure

This project is a React Native CLI mobile application called Secuvest.

Tech Stack:
- React Native CLI (Javascript)
- React Navigation (Stack + Bottom Tabs + Drawer)
- Axios for API calls
- Redux Toolkit for state management
- React Native Reanimated for animations
- AsyncStorage for local persistence

Project Folders:

src/
  screens/          ← All app screens organized by module
  components/       ← Reusable UI components
  navigation/       ← Stack, Tab, Drawer navigators
  services/         ← API service files (one per module)
  store/            ← Global state slices
  hooks/            ← Custom React hooks
  utils/            ← Helper functions
  constants/        ← Colors, fonts, API base URL, etc.
  assets/           ← Images, fonts, icons

ai/
ai-context/

Important Notes:
- This is a frontend-only React Native app. There is NO backend code.
- All data comes from REST APIs (provided by the backend team).
- API base URL and auth tokens are stored in constants/config.ts.
- All screens use functional components with Javascript.
- Navigation uses React Navigation.
- AI prompts are stored in /ai.
- Module documentation is stored in /ai-context.