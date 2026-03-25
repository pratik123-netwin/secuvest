import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StoreSelectionScreen from '../screens/Attendance/StoreSelectionScreen';
import LocationVerificationScreen from '../screens/Attendance/LocationVerificationScreen';
import StoreActionOptionsScreen from '../screens/Attendance/StoreActionOptionsScreen';
import ConfirmClockInScreen from '../screens/Attendance/ConfirmClockInScreen';
import ActiveSessionScreen from '../screens/Attendance/ActiveSessionScreen';
import BreakManagementScreen from '../screens/Attendance/BreakManagementScreen';
import ConfirmClockOutScreen from '../screens/Attendance/ConfirmClockOutScreen';
import ClockOutSuccessScreen from '../screens/Attendance/ClockOutSuccessScreen';

const Stack = createStackNavigator();

const AttendanceNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StoreSelection" component={StoreSelectionScreen} />
      <Stack.Screen name="LocationVerification" component={LocationVerificationScreen} />
      <Stack.Screen name="StoreActionOptions" component={StoreActionOptionsScreen} />
      <Stack.Screen name="ConfirmClockIn" component={ConfirmClockInScreen} />
      <Stack.Screen name="ActiveSession" component={ActiveSessionScreen} />
      <Stack.Screen name="BreakManagement" component={BreakManagementScreen} />
      <Stack.Screen name="ConfirmClockOut" component={ConfirmClockOutScreen} />
      <Stack.Screen name="ClockOutSuccess" component={ClockOutSuccessScreen} />
    </Stack.Navigator>
  );
};

export default AttendanceNavigator;
