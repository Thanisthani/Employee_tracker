import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect} from 'react';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import BottomNavigation from './Screens/BottomNavigation';

const Stack = createNativeStackNavigator()

// For Authenticated user
export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Bottom'
            screenOptions={{
                headerShown: false
            }}>
            
            <Stack.Screen name="Bottom" component={BottomNavigation} />
            
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

);