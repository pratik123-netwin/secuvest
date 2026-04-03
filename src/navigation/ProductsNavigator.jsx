import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../screens/Products/ProductListScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';
import SelectedProductsScreen from '../screens/Products/SelectedProductsScreen';

const Stack = createStackNavigator();

const ProductsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="SelectedProducts" component={SelectedProductsScreen} />
  </Stack.Navigator>
);

export default ProductsNavigator;
