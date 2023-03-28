import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor } from '../../constants/Color';
import * as Location from 'expo-location';
import {isEnter } from '../../services/storage';
import { getSite, locationUpdate } from '../../services/track';
import {useStopWatch} from '../../hooks/useStopWatch';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';



// Main component
const GeoFencing = ({userID}) =>
{
  
  // stop watch hook
  const {
    time,
    start,
    stop,
    reset,
    isRunning,
    dataLoaded
  } = useStopWatch();

  // set site name
  const [siteName, setSiteName] = useState('No site');

  // start location updates
  const requestPermission = async () =>
  {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted)
    {
      const background = await Location.requestBackgroundPermissionsAsync();
      if (!background.granted)
      {
        console.log('Permission to  access location was denied');
      }
    }
    else
    {
      console.log('Permission to access location was denied');
    }

    // Geofence function
    await locationUpdate();
  }

  // Current status function

  const currentStatus = async (checkIn,checkOut) =>
  {
    if(checkIn !=null){
      await updateDoc(doc(db, 'Employees', userID), {
        Check_in: checkIn,
        Check_out: checkOut
      });
    }
    else {
      await updateDoc(doc(db, 'Employees', userID), {
        Check_out: checkOut
      });
    }
  }
  
 

  useEffect(() => {
    requestPermission();  
  }, []);


  
  // get status value from local storage
  useEffect(() => {
    const interval = setInterval(async () =>
    {
      // await console.log('timer trigger ' ,isRunning);
      const geoEnter = await isEnter();

      if (geoEnter == 'inside')
      {
        const geoSite = getSite(); 
        setSiteName(geoSite);
        console.log('site name',geoSite)
        // console.log('site',geoSite)
        if (!isRunning)
        {
          // console.log('start timer')
          start();
          currentStatus(Date.now(), null);
         
        }
      }
      else
      {
        // console.log('false on  timer');
      
        if (isRunning)
        {
          // console.log('stop on timer')
          stop();
          currentStatus(null, Date.now());
        }
      }
    }, 10 * 1000);
  
    return () => clearInterval(interval);
  }, [isRunning]);

  // check timer value
  if (!dataLoaded) {
    return null;
  }
  
  return (
      <View style={styles.timerBox}>
           {/* Timer */}
        <Text style={styles.subHeading}> Total worked today:</Text>
        <View style={styles.timerWrapper}>
        <Text style={styles.timer}>{ time }</Text>
      </View>
      <View style={styles.bottomWrap}>
        <SimpleLineIcons name="location-pin" size={RFPercentage(2.5)} color="#c1c1c1" />
        <Text style={styles.locationText}> {siteName}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
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
        justifyContent: 'center',
      },
      timer: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: RFPercentage(6),
        color:'#ffffff'
      },
      bottomWrap: {
        flexDirection: 'row',
        alignItems:'baseline'
  }
    
});

export default GeoFencing;