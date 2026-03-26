import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Clock, Menu } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import HomeScreen from '../screens/Home/HomeScreen';
import AttendanceNavigator from './AttendanceNavigator';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
    <Text style={{ fontSize: 18, color: '#333' }}>{name} Screen</Text>
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#6B7280', // Gray
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          if (route.name === 'Home') IconComponent = Home;
          else if (route.name === 'Clock') IconComponent = Clock;
          else if (route.name === 'Label') IconComponent = Menu;

          return (
            <View style={{
              backgroundColor: focused ? '#EEF2FF' : 'transparent',
              padding: 8,
              borderRadius: 20,
            }}>
               {IconComponent && <IconComponent size={22} color={color} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Clock"
        component={AttendanceNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen 
        name="Label" 
        component={() => <PlaceholderScreen name="Label" />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
