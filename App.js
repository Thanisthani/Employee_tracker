import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_300Light
} from "@expo-google-fonts/poppins";
import Index from './src';
import * as SplashScreen from 'expo-splash-screen';
import { useState,useCallback , useEffect } from 'react';
import { View } from 'react-native';


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light
  
  });

  if ( !fontsLoaded) {
    return null;
  }

  return (

     <>
      <StatusBar style="auto" />
      
      <Index />
      </>
  
  );
}

