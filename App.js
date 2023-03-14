import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_300Light
} from "@expo-google-fonts/poppins";
import { Provider } from 'react-redux';
import { store } from './features/store';
import AuthNavigation from './AuthNavigation';


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
      
    <Provider store={store}>
      
      <AuthNavigation />
      </Provider>
      </> 
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

});
