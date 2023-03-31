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
  },
  timerBox: {
    marginTop:hp('2%'),
    backgroundColor: PrimaryColor,
    width: wp('90%'),
    height: hp('22%'),
    borderRadius: hp('1.5%'),
    padding: hp('2%'),
    justifyContent:'space-between'
  },
  subHeading: {
    fontFamily: 'Poppins_400Regular',
    fontSize: RFPercentage(2.5),
    color:'#c1c1c1'
  },
  locationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: RFPercentage(2.8),
    color:'#c1c1c1'
  },
  timerWrapper: {
    alignItems: 'center',
    justifyContent:'center'
  },
  timer: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(6),
    color:'#ffffff'
  },
  bottomWrap: {
    flexDirection: 'row',
    alignItems:'baseline'
    // justifyContent:'space-around'
  },
  loader: {
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default HomeScreen