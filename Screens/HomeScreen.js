import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor, TextPrimaryColor } from '../constants/Color';
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Summary</Text>
      {/* Timer */}
      <View style={styles.timerBox}>
        <Text style={styles.subHeading}> Total worked today:</Text>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>06:13:04</Text>
        </View>
        <View style={styles.bottomWrap}>
        <SimpleLineIcons name="location-pin" size={RFPercentage(2.5)} color="#c1c1c1" />
          <Text style={styles.locationText}> East Wing A</Text>
        </View>
      </View>

      {/* Activity details */}
      <Text style={styles.actText}>Activity Details</Text>

      <View style= {styles.actBox}>
        <View style={styles.timeBox}>
          <Text style={styles.label}>In time</Text>
          <Text style={styles.timeText}>09.00 am</Text>
        </View>
        {/* vertical line */}
        <View style={styles.verticalLine}></View>

        <View style={styles.timeBox}>
          <Text style={styles.label}>Out time</Text>
          <Text style={styles.timeText}>13.34 pm</Text>
        </View>
        
      </View>

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
  actText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(3.2),
    color: PrimaryColor,
    marginVertical: hp('2%')
  },
  actBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
    width:wp('80%')
    
  },
  timeBox: {
    // flex: 1,
    // justifyContent: 'center'
    // alignItems:''
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: RFPercentage(2.5),
    color:'#636363'
  },
  timeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(4),
    color: PrimaryColor,
  },
  verticalLine: {
    width: 0.5,
    height: '100%',
    backgroundColor:'#636363'
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
  }
});

export default HomeScreen