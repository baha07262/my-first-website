import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRoutes } from './routes';

import SignInScreen from '../screens/auth/SignInScreen';
import PasswordHelpScreen from '../screens/auth/PasswordHelpScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import CityPickerScreen from '../screens/auth/CityPickerScreen';

import RecipesScreen from '../screens/app/RecipesScreen';
import RecipeDetailScreen from '../screens/app/RecipeDetailScreen';
import ShoppingListScreen from '../screens/app/ShoppingListScreen';
import AccountScreen from '../screens/app/AccountScreen';

const Stack = createNativeStackNavigator<RootRoutes>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="PasswordHelp" component={PasswordHelpScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="CityPicker" component={CityPickerScreen} />

        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Shopping" component={ShoppingListScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
