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
import { Stopwatch} from 'react-native-stopwatch-timer';
import { getSite, locationUpdate } from '../../services/track';


// Main component
const GeoFencing = () =>
{
  // check geofence status
  const [enter, setEnter] = useState(false);

  // set site name
  const [siteName, setSiteName] = useState('No site');

  // start location updates
  const requestPermission = async () =>
  {
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

    // Geofence function
    await locationUpdate();
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
        const geoSite = getSite(); 
        setSiteName(geoSite);
      }
      else {
        setEnter(false);
      }
     
      console.log('timer trigger');
    }, 0.5* 60 * 1000);
  
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
      <View style={styles.bottomWrap}>
        <SimpleLineIcons name="location-pin" size={RFPercentage(2.5)} color="#c1c1c1" />
        <Text style={styles.locationText}> { siteName }</Text>
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
        // justifyContent:'space-around'
    }
});

const options = {
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(6),
    color: '#ffffff'
  },
};


export default GeoFencing;