import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from './src/store/SessionStore';
import { ShoppingProvider } from './src/store/ShoppingStore';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <ShoppingProvider>
          <StatusBar style="dark" />
          <RootNavigator />
        </ShoppingProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
