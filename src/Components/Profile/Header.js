import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { PrimaryColor } from '../../constants/Color';
import { RFPercentage } from 'react-native-responsive-fontsize';


const Header =() => {
    return (
        <View style={styles.container}>
            <Ionicons name="chevron-back-sharp" size={24} color={PrimaryColor} />
            <Text style={styles.heading}>
               Profile
            </Text>
            <View>

            </View>
      </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        width: wp('100%'),
        // marginLeft: wp('10%'),
        // marginRight: wp('10%'),
        paddingHorizontal:wp('7%'),
        paddingTop:hp('1%')
    },
    heading: {
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(2.7),
        color: '#090A0A'
        
    }
    
});

export default Header