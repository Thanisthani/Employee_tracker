import React from 'react'
import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TextPrimaryColor } from '../constants/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NotificationScreen = ()=>{
  return (
    <View style= {styles.container}>
    <Text style={styles.mainHeading}>Notification</Text>
</View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight + hp('1%'),
        alignItems:'center'
    },
    mainHeading: {
        fontFamily:'Poppins_600SemiBold',
        fontSize:RFPercentage(4),
        color:TextPrimaryColor
      }
});

export default NotificationScreen