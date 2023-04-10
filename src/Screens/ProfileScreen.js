import React from 'react'
import { Text, TouchableOpacity, View,StyleSheet,StatusBar} from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { PrimaryColor, TextPrimaryColor } from '../constants/Color';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { RFPercentage } from 'react-native-responsive-fontsize';
import { useStopWatch } from '../hooks/useStopWatch';

const ProfileScreen = () => {
 
    //   stop watch hook
  const {
    reset
  } = useStopWatch();
    const dispatch = useDispatch();

    // // sign out
    const handleSignOut = () => {
     signOut(auth).then(() => {
       console.log("User sign out");
         dispatch(logout());
         reset();
     }).catch((error) => {
         console.log(error)
     })
        
        
   
 }
    return (
        <View style= {styles.container}>
            <Text style={styles.mainHeading}>Profile</Text>
            <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
                <Text style={styles.btnText}>Sign Out</Text>
            </TouchableOpacity>
   
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
      },
    btn: {
        marginTop:hp('5%'),
        backgroundColor: PrimaryColor,
        padding: 5,
        marginBottom: 30,
        width: wp('70%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
       
    },
    btnText: {
        color: '#fff',
        fontSize:RFPercentage('3')
    }
});

    export default ProfileScreen;