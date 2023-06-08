import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import Index from './src';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as AppSplashScreen from 'expo-splash-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { View} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { setGeoCoords } from './src/services/storage';
// "splash": {
//   "image": "./assets/images/logo.png",
//   "resizeMode": "contain",
//   "backgroundColor": "#ffffff"
// },

// Keep the splash screen visible while we fetch resources
AppSplashScreen.preventAutoHideAsync();


export default function App() {
  
  const [appIsReady, setAppIsReady] = useState(false);
  
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light
  
  });


  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // let [fontsLoaded] = useFonts({
        //     Poppins_500Medium,
        //     Poppins_400Regular,
        //     Poppins_600SemiBold,
        //     Poppins_700Bold,
        //     Poppins_300Light
          
        // });
          
          const sites = await collection(db, 'Sites');
          
          await onSnapshot(sites, (snapshot) => {
            setGeoCoords((snapshot.docs.map((site) => ({ id: site.id, ...site.data() }))));
          });
        // Artificially delay for two seconds to simulate a slow loading
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
          setAppIsReady(true);
        
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
        await AppSplashScreen.hideAsync();
        // await navigation.navigate("LoginScreen");
  
    }
  }, [appIsReady]);

if (!appIsReady) {
    return null;
}
  

  if ( !fontsLoaded) {
    return null;
  }

  return (

     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      
      <Index />
      </View>
  
  );
}

