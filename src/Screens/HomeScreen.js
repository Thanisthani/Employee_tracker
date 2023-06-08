import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor, TextPrimaryColor } from '../constants/Color';
import GeoFencing from '../Components/Home/GeoFencing';
import { auth, db } from '../../firebase';
import ActivityDetails from '../Components/Home/ActivityDetails';
import { doc, onSnapshot } from 'firebase/firestore';

const HomeScreen = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser.uid ? auth.currentUser.uid : null);
  const [loading, setLoading] = useState(false);

  // user details
  const [user, setUser] = useState();
            
  // fetch user data
  
  const getUser = async () => {
    try
    {
   await setLoading(true);
      const ref = await doc(db, "Employees", auth.currentUser.uid);
      
      await onSnapshot(ref, (snapshot) => {
        setUser(snapshot.data());        
      });
      await setLoading(false);
    } catch (error)
    {
      console.log('Home err:', error);
    }
  } 


  useEffect(() => {
      getUser();
  }, []);
  
  
  return (
    <View style={styles.container}>
       {/* Modal */}
       {/* <Modal
        animationType="fade"
        transparent={false}
        visible={loading}
        statusBarTranslucent={true}
      >
        <View style={styles.indicator}>
          <Text>Hiiii</Text>
          <ActivityIndicator animating={true} size="large" color="#0000ff" />
        </View>
      </Modal> */}
      {currentUser && user &&
        <>
            <Text style={styles.mainHeading}>Summary</Text>
            <GeoFencing userID={currentUser} site={user.Site_name} /> 
            <ActivityDetails user={user} userID={currentUser} />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    paddingTop:StatusBar.currentHeight + hp('1%'),
    paddingHorizontal:wp('5%')
  },
  mainHeading: {
    fontFamily:'Poppins_600SemiBold',
    fontSize:RFPercentage(5),
    color:TextPrimaryColor
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default HomeScreen