import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import LoginForm from '../Components/Login/LoginForm';
const LoginScreen = () =>{
    return (
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image style={styles.logoImg} source={require('../assets/images/LoginLogo.png')} />
        </View>

        <View style={styles.formWrapper}>
          <LoginForm />
        </View>
        
        
      </View>
   
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoImg: {
        width:wp('60%'),
        // height: hp('30%'),
        resizeMode:'contain'
  },
  logoWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF'
  },
  formWrapper: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: hp('5%'),
    backgroundColor: '#FFFFFF'
    
  }
  });
export default LoginScreen