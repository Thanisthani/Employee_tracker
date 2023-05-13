import React, { useEffect, useState } from 'react'
import { View,StyleSheet,StatusBar, Text} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import Header from '../Components/NotificationScreen/Header';
import ListOfNotification from '../Components/NotificationScreen/ListOfNotification';


const NotificationScreen = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <Header navigation={ navigation} />
            <ListOfNotification />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // alignItems: 'center',
        paddingTop: StatusBar.currentHeight + hp('1%'),
        paddingHorizontal:wp('6%')
    }
});

    export default NotificationScreen;