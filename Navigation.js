import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';

const Stack = createNativeStackNavigator()

// For Authenticated user
export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Bottom'
            screenOptions={{
                headerShown: false
            }}>
            
            <Stack.Screen name="Home" component={HomeScreen} />
            
        </Stack.Navigator>
    </NavigationContainer>
);

// For Unauthorized user
export const SignedOutStack = () =>
(
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
     
       
    </Stack.Navigator>
</NavigationContainer>

    )