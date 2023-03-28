import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor, TextPrimaryColor } from '../constants/Color';
import GeoFencing from '../Components/Home/GeoFencing';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import ActivityDetails from '../Components/Home/ActivityDetails';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
    // redux state
    const check = useSelector((state) => state.auth);

  const userHandler =async (user) => {
   try {
     user ? await setCurrentUser(user) : setCurrentUser(null);
    
    }
    catch (error)
    {
      console.log('error on home', error)
    }
  }
 

  useEffect(() =>{
    onAuthStateChanged(auth, user => {
      userHandler(user.uid);
    })
    console.log('loading', check)
  }
    , [check]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Summary</Text>
      {/* Timer */}
      {currentUser && 
      <GeoFencing userID={currentUser}/> 
      }
      
      {/* {check.isLoading ?
        <View style={styles.loader}>
          <ActivityIndicator color='#032F41' size="large" />
        </View>
        :
      <> */}
      {/* Activity details */}
      {currentUser &&
        <>
        <ActivityDetails userID={currentUser} />
        </>
      }

      {/* summary */}
      <View style={styles.summaryBox}>
        <View>
          <Text style={styles.subHeading}>Last Session:</Text>
          <Text style={styles.timeLog}>07 hours 35 minutes</Text>
        </View>

        {/* horizontal line */}

        <View style={styles.horizontalLine}></View>
        <View>
          <Text style={styles.subHeading}>Week Total:</Text>
          <Text style={styles.timeLog}>38 hours 35 minutes</Text>
        </View>
        
        </View>
        {/* </>
} */}
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

  summaryBox: {
    marginTop:hp('3%'),
    backgroundColor: PrimaryColor,
    width: wp('90%'),
    height: hp('28%'),
    borderRadius: hp('1.5%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    justifyContent:'space-between'
  },
  timeLog: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(3.5),
    color:'#ffffff'
  },
  horizontalLine: {
    width: '90%',
    height: 0.39,
    backgroundColor: '#043d54',
    alignSelf:'center'
  },
  loader: {
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default HomeScreen