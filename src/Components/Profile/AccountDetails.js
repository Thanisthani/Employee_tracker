import React from 'react'
import { StyleSheet, View ,Text } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TextPrimaryColor } from '../../constants/Color';


const AccountDetails =()=> {
  return (
    <View style={styles.container}> 
    <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Account Actions</Text>
    </View>
    <View style={styles.labelWrapper}>
        <Text style={styles.label}>Reset Password</Text>
    </View>
    {/* horizontal line */}

    <View style={styles.horizontalLine}></View>

    <View style={styles.labelWrapper}>
        <Text style={styles.label}>Sign Out</Text>
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
        paddingVertical:hp('1.5%'),
        fontSize: RFPercentage(2.6),
        fontFamily: 'Poppins_400Regular',
        color: '#032F41',
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


export default AccountDetails