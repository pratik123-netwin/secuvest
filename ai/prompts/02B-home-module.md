Module Name: Home & Navigation

Build the Home screen and navigation structure for Secuvest.

1. Bottom Tab Navigation (3 tabs):
   - Home (icon: home)
   - Clock/Attendance (icon: clock)
   - Menu (icon: menu)
   - Handle active/inactive icon states

2. Drawer/Side Menu:
   - Header with SECUVEST logo
   - Active items: Home, Attendance, Suppliers, Products, Profile
   - Items with "Soon" badge: Settings, Notifications, Help & Support
   - Bottom logout icon with logout handler

3. Home Screen:
   - User greeting: "Hi, [Name]" (pull from Redux auth state)
   - "Start your Shift" button → navigates to Store Selection screen
   - Insights and Recent Feedbacks sections should not display

Store in: src/navigation/ for navigators, src/screens/Home/ for Home screen.
Tech: React Navigation v6 Bottom Tabs + Drawer, TypeScript.