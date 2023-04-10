import React, { useState } from 'react'
import {StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor, TextPrimaryColor } from '../constants/Color';
import GeoFencing from '../Components/Home/GeoFencing';
import { auth } from '../../firebase';
import ActivityDetails from '../Components/Home/ActivityDetails';

const HomeScreen = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser.uid? auth.currentUser.uid : null);

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Summary</Text>
      {/* Timer */}
      {currentUser && 
      <GeoFencing userID={currentUser}/> 
      }
    
      {/* Activity details */}
      {currentUser &&
        <>
        <ActivityDetails userID={currentUser} />
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
  }
});

export default HomeScreen