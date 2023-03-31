import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons ,Feather,Ionicons} from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor } from '../../constants/Color';
import * as Location from 'expo-location';
import {getIsStart, isEnter, setIsStartStorage } from '../../services/storage';
import { getSite, locationUpdate, stopLocationUpdate } from '../../services/track';
import {useStopWatch} from '../../hooks/useStopWatch';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Moment from 'moment';


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
    dataLoaded,
    actualTime
  } = useStopWatch();

  // set site name
  const [siteName, setSiteName] = useState('No site');

  const [isStart, setIsStart] = useState(false);

  // start location updates
  const requestPermission = async () =>
  {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted)
    {
      const background = await Location.requestBackgroundPermissionsAsync();
      if (!background.granted)
      {
        console.log('Permission to access location was denied');
      }
    }
    else
    {
      console.log('Permission to access location was denied');
    }

    // Geofence function
    await locationUpdate();
    setIsStart(true);
  }

  // stop geofence

  const stopGeo = async () =>
  {
    await stopLocationUpdate();
    setIsStart(false);
    await reset();
    await uploadWrokLog();
    if (isRunning) {
      await currentStatus(null, Date.now());
    }
  }

  // Upload working hours
  const uploadWrokLog = async () =>
  {
    const now = await new Date();
    const today = await Moment(now).format('YYYY-MM-DD'); 
    const ref = await collection(db, "Employees", userID, "Working_hours");
    await setDoc(doc(ref),
    { 
      Date: today,
      Duration: actualTime
    }).then(() => {
        console.log("upload wrok log")
    })

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
    const loadData = async () => {

      const data = await getIsStart();
      setIsStart(data == 'true');
    }

    loadData();
  }, []);

  useEffect(() => {
    setIsStartStorage(isStart);
  }, [isStart]);
  
  // get status value from local storage
  useEffect(() => {
    // check user want to start geo fencing
    if (isStart)
    {
      const interval = setInterval(async () => {
        // await console.log('timer trigger ', isRunning);
        const geoEnter = await isEnter();

        if (geoEnter == 'inside') {
          const geoSite = getSite();
          setSiteName(geoSite);
          console.log('site',geoSite)
          if (!isRunning) {
            // console.log('start timer')
            start();
            currentStatus(Date.now(), null);
         
          }
        }
        else {
          // console.log('false on  timer');
      
          if (isRunning) {
            // console.log('stop on timer')
            stop();
            currentStatus(null, Date.now());
          }
        }
   
      }, 10 * 1000);
  
      return () => clearInterval(interval);
    }
  }, [isRunning,isStart]);

  // check timer value
  if (!dataLoaded) {
    return null;
  }
  
  return (
      <View style={styles.timerBox}>
           {/* Timer */}
        <Text style={styles.subHeading}> Total worked today:</Text>
      <View style={styles.timerWrapper}>
        <View style={styles.timeContainer}>
          <Text style={styles.timer}>{time}</Text>
        </View>
       
        {isStart ?
          <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn} onPress={stopGeo} >
            <View style={styles.iconWrapper}>
              <Feather name="stop-circle" size={RFPercentage(6)} color="white" />
              <Text style={styles.subHeading}>Stop</Text> 
            </View>
          </TouchableOpacity>
            </View>
          :
          <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn} onPress={requestPermission } >
            <View style={styles.iconWrapper}>
              <Ionicons name="play-outline" size={RFPercentage(6)} color="white" />
              <Text style={styles.subHeading}>Start</Text> 
            </View>
        </TouchableOpacity>
            </View>
        }

      </View>
      <View style={styles.bottomWrap}>
        <SimpleLineIcons name="location-pin" size={RFPercentage(2)} color="#c1c1c1" />
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
        justifyContent:'space-around'
      },
      subHeading: {
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(2.2),
        color:'#c1c1c1'
      },
      locationText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(2.5),
        color:'#c1c1c1'
      },
      timerWrapper: {
        alignItems: 'baseline',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 20,
      },
      timer: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: RFPercentage(5.5),
        color:'#ffffff'
      },
      bottomWrap: {
        flexDirection: 'row',
        alignItems:'baseline'
  },
  btnWrapper: {
    flex: 1,
    alignItems:'center'
  },
  timeContainer: {
    flex: 3,
    alignItems:'center'
  }
  ,
  iconWrapper: {
    alignItems:'center'
  }
});

export default GeoFencing;