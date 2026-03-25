import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectSupplierScreen from '../screens/Supplier/SelectSupplierScreen';
import SupplierProfileScreen from '../screens/Supplier/SupplierProfileScreen';
import SupplierDetailScreen from '../screens/Supplier/SupplierDetailScreen';
import MetricsDrilldownScreen from '../screens/Supplier/MetricsDrilldownScreen';

const Stack = createStackNavigator();

const SupplierNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SelectSupplier" component={SelectSupplierScreen} />
    <Stack.Screen name="SupplierProfile" component={SupplierProfileScreen} />
    <Stack.Screen name="SupplierDetail" component={SupplierDetailScreen} />
    <Stack.Screen name="MetricsDrilldown" component={MetricsDrilldownScreen} />
  </Stack.Navigator>
);

export default SupplierNavigator;
