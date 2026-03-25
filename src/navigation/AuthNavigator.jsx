import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import LoginStep1 from '../screens/auth/LoginStep1';
import LoginStep2 from '../screens/auth/LoginStep2';
import Signup from '../screens/auth/Signup';
import OTPVerification from '../screens/auth/OTPVerification';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LoginStep1" component={LoginStep1} />
      <Stack.Screen name="LoginStep2" component={LoginStep2} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
