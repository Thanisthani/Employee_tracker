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
import * as TaskManager from 'expo-task-manager';
import {getGeoCoords, isEnter, setIsEnter } from '../../services/storage';
import { isPointWithinRadius } from 'geolib';
import { Stopwatch} from 'react-native-stopwatch-timer';

const LOCATION_TASK_NAME = "GEOFENCING";

let coordinates=[];

// Bg task
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error)
  {
    console.log(error, 'IN task manager');
    return;
}
  // console.log('[tracking]', 'Received new locations', locations[0].coords );
  
  try
  {
    // Check point whether it's inside geofence or not
    for (coords of coordinates)
    {
      console.log('coords name', coords.name);
      const status= isPointWithinRadius(
        { latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude },
        { latitude: coords.latitude, longitude: coords.longitude }, 
        coords.radius  //Geofence Radius
      );
       // Store geofence status on local storage
    if (status)
    {
      console.log('Status of geofence true');
      setIsEnter('inside');
      break;
    }
    else
    {
      console.log('Status of geofence false');
      setIsEnter('outside')
    }
    }
 
  }
  catch (error)
  {
    console.log('task manger erfror', error);
  }
});

// Main component
const GeoFencing = () =>
{
  // check geofence status
  const [enter, setEnter] = useState(false);

  // start location updates
  const requestPermission = async () =>
  {
    coordinates =  await getGeoCoords();
    console.log("Geo coordinates", coordinates);
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted)
    {
      const background = await Location.requestBackgroundPermissionsAsync();
      console.log('permission grantted')
      if (!background.granted)
      {
        console.log('Permission to access location was denied');
      }
    }
    else
    {
      console.log('Permission to access location was denied');
    }

    // const { coords } = await Location.getCurrentPositionAsync();
    // await console.log("current location", coords);

    // Check task manager defined or not
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);

    if (!isTaskDefined)
    {
      console.log("Task is not defined ")
      return
    }

    // Live location update
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 3 * 60 * 1000, //time duration to check location
      // android behavior
      foregroundService: {
        notificationTitle: 'Office marathon is active',
        notificationBody: 'Monitoring your location to measure total distance',
        notificationColor: '#333333',
      },
      // ios behavior
      activityType: Location.ActivityType.Fitness,
      showsBackgroundLocationIndicator: true,
    });
    console.log('[tracking]', 'started background location task');
  }

  useEffect(() => {
    
    requestPermission();  
  }, []);
  
  // get status value from local storage
  useEffect(() => {
    const interval = setInterval(async () =>
    {
    
      const geoEnter = await isEnter();
      if (geoEnter == 'inside')
      {
        setEnter(true);
      }
      else {
        setEnter(false);
      }
     
      console.log('timer trigger');
    },  2 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, []);

  
  return (
      <View style={styles.timerBox}>
           {/* Timer */}
        <Text style={styles.subHeading}> Total worked today:</Text>
        <View style={styles.timerWrapper}>
        {/* <Text style={styles.timer}>06:13:04</Text> */}
        <Stopwatch
            laps
            msecs={false}
            start={enter}
            // To start
            options={options}
            // Options for the styling
          />
      </View>
      {/* <View>
        {enter=='inside'? 
          <Text style={styles.locationText}>Entered geofence { enter}</Text>
          : <Text style={styles.locationText}>Not entered { enter}</Text>}
      </View> */}
        <View style={styles.bottomWrap}>
        <SimpleLineIcons name="location-pin" size={RFPercentage(2.5)} color="#c1c1c1" />
          <Text style={styles.locationText}> East Wing A</Text>
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
    }
});

const options = {
  // container: {
  //   backgroundColor: ,
    
  // },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(6),
    color: '#ffffff'
  },
};


export default GeoFencing;