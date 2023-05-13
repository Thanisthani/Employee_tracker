import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { PrimaryColor } from '../../constants/Color';
import { RFPercentage } from 'react-native-responsive-fontsize';


const Header =({ navigation }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-sharp" size={24} color={PrimaryColor} />
            </TouchableOpacity>
         
            <Text style={styles.heading}>
               Notifications
            </Text>
            <View>

            </View>
            </View>
        </View>
        
    
  )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        width: wp('100%'),
        // marginLeft: wp('10%'),
        // marginRight: wp('10%'),
        paddingHorizontal:wp('6%'),
        paddingTop:hp('1%')
    },
    heading: {
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(2.7),
        color: '#090A0A'
        
    }
    
});

export default Header