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

let something = false;


  
const GeoFencing = () => {
 const [ isEnter, setIsEnter ] = useState(something);
    const LOCATION_TASK_NAME = "GEOFENCING";
    TaskManager.defineTask("GEOFENCING", ({ data: { eventType, region }, error }) => {
      if (error) {
          console.log(error, 'IN task manager')
        return;
    }
    // console.log("Task manager geo fencing ",region)
    const stateString = Location.GeofencingRegionState[region.state].toLowerCase();
    console.log('Geo location state ',stateString)
      if (eventType === Location.GeofencingEventType.Enter) {
        setIsEnter(true);
        console.log("You've entered region:", region);
      } else if (eventType === Location.GeofencingEventType.Exit) {
        setIsEnter(false);
        console.log("You've left region:", region);
      }
    });
  

    let geofence = {
        latitude:6.879635905323236, 
        longitude:79.86587458864574,
        radius: 1000,
        notifyOnEnter: true,
        notifyOnExit: true,
    };
  const requestPermission = async () => {
    
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) {
      const background = await Location.requestBackgroundPermissionsAsync();
      if (!background.granted) {
        console.log('Permission to access location was denied');
      }
    }
    else {
      console.log('Permission to access location was denied');
    }

    const { coords } = await Location.getCurrentPositionAsync();
   await console.log("current location ", coords)
   // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    console.log('Task defined ', isTaskDefined)

    if (!isTaskDefined) {
     console.log("Task is not defined")
     return
   }
    await Location.startGeofencingAsync(LOCATION_TASK_NAME, [geofence]).then((value) => {
      console.log(`Started geofencing`,isEnter);
    }).catch((error) => {
      console.log(`Error starting geofencing , error: ${error}`);
    }); 
  }

    useEffect( () => {
      requestPermission();
    }, []);
  
  return (
     
      <View style={styles.timerBox}>
           {/* Timer */}
        <Text style={styles.subHeading}> Total worked today:</Text>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>06:13:04</Text>
      </View>
      <View>
        {isEnter? 
          <Text style={styles.locationText}>Entered geofence</Text>
        :<Text style={styles.locationText}>Not entered</Text>}
      </View>
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
        height: hp('28%'),
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

export default GeoFencing