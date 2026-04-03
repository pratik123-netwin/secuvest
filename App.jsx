import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCredentials } from './src/store/slices/authSlice';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from "react-native-keyboard-controller";

const Root = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userData;
      try {
        userToken = await AsyncStorage.getItem('authToken');
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) userData = JSON.parse(userStr);
      } catch (e) {
        // Restoring token failed
      }
      if (userToken) {
        store.dispatch(setCredentials({ token: userToken, user: userData }));
      }
      setIsReady(true);
    };

    bootstrapAsync();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4338CA" />
      </View>
    );
  }

  return <AppNavigator />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <KeyboardProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

