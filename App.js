import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_300Light
} from "@expo-google-fonts/poppins";
import Index from './src';
import { Provider } from 'react-redux';
import AuthNavigation from './src/Navigation/AuthNavigation';
import {store} from './src/features/store'

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light
  
  });
  if (!fontsLoaded) {
    return null;
  }
  
  return (

     <>
      <StatusBar style="auto" />
      
      <Index />
      </>
  
  );
}

