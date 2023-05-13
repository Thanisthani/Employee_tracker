import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { PrimaryColor } from '../../constants/Color';

const ListOfNotification = () => {
    return (
        <View style={styles.container}>
            <Text style={ styles.heading}>Today </Text>
            <ScrollView>
                <View style={styles.list}>
                    <View style={styles.icon}>
                        <View>
                            <Text style={styles.iconText}>CWS</Text>
                        </View>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.description}>Checked-Out from Central West B</Text>
                        <Text syle={styles.time}>9.31 PM</Text>
                    </View>
                </View>

                 {/* horizontal line */}

        <View style={styles.horizontalLine}></View>

                <View style={styles.list}>
                    <View style={styles.icon}>
                        <View>
                            <Text style={styles.iconText}>CWS</Text>
                        </View>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.description}>Checked-Out from Central West B</Text>
                        <Text syle={styles.time}>9.31 PM</Text>
                    </View>
                </View>
          
            </ScrollView>
        </View>
        
  )
}

export default ListOfNotification

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingTop:hp('3%')
    },
    heading: {
        fontFamily: 'Poppins_700Bold',
        color: '#090A0A',
        fontSize: RFPercentage(2.8),
    },
    list: {
        flexDirection: 'row',
        width: wp('100%'),
        alignItems: 'center',
        paddingVertical:hp('2%')
    },
    icon: {
        width: wp('12%'),
        height:wp('12%'), 
        backgroundColor: PrimaryColor,
        borderRadius: wp('15%') / 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconText: {
        color:'#FFFFFF',
        fontSize: RFPercentage(1.5),
        fontFamily: 'Poppins_700Bold',
        // padding:wp('5%')
    },
    wrapper: {
        paddingLeft:wp('3%') 
    },
    description: {
        color: '#000000',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: RFPercentage(2.0)
    },
    time: {
        color: '#6C7072',
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(1.0)

    },
    horizontalLine: {
        width: wp('96%'),
        height: 0.2,
        backgroundColor: '000000',
        alignSelf:'center'
      },
})