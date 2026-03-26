Module Name: Profile

Build the My Profile screen for the Secuvest React Native app.

Requirements:
- Header with back button
- User profile card: Avatar (circular image or initials placeholder), Name, Role
- "Contact Information" section as a list:
  - Each item: Icon | Label | Value
  - Items: Email, Phone, Location, Department, Member Since
- Data pulled from Redux auth state (user object from login API response)
- No Activity tab, no Performance Metrics (out of scope)

Store in: src/screens/Profile/ProfileScreen.jsx

Component Rules — IMPORTANT:
Whenever a UI element is used more than once across 
any screen in this module or could be reused in other 
modules, always create it as a separate reusable 
component inside src/components.
