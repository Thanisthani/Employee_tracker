import React from 'react'
import { Text, View, StyleSheet  } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TextPrimaryColor } from '../../constants/Color';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const UserDetails = ({user}) =>
{
  return (
      <View style={styles.container}> 
          <View style={styles.headingWrapper}>
              <Text style={styles.heading}>Details</Text>
          </View>
          <View style={styles.labelWrapper}>
              <Text style={styles.label}>Employee ID</Text>
              <Text style={styles.details}>{ user.Emp_ID}</Text>
          </View>
          {/* horizontal line */}

          <View style={styles.horizontalLine}></View>

          <View style={styles.labelWrapper}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.details}>{ user.Email}</Text>
          </View>

          
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        paddingTop: hp('3%'),
        
    },
    headingWrapper: {
        backgroundColor: '#EDEDED',
        height: hp('4%'),
        justifyContent:'center',
        flexDirection:'column'
    },
    heading: {
        paddingHorizontal:wp('7%'),
        fontSize: RFPercentage(2.5),
        fontFamily: 'Poppins_400Regular',
        color: TextPrimaryColor,
    },
    label: {
        paddingTop:hp('1.5%'),
        fontSize: RFPercentage(2.6),
        fontFamily: 'Poppins_400Regular',
        color: TextPrimaryColor,
    },
    details: {
        paddingTop:hp('1.5%'),
        fontSize: RFPercentage(3.2),
        fontFamily: 'Poppins_600SemiBold',
        color:TextPrimaryColor
    },
    labelWrapper: {
        paddingHorizontal:wp('7%'),
    },
    horizontalLine: {
        width: '90%',
        height: 1.3,
        backgroundColor: '#ededed',
        alignSelf: 'center',
        // paddingTop:hp('1.5%'),
      },

});
export default UserDetails;