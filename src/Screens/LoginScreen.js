import React from 'react'
import { ScrollView } from 'react-native';
import { StyleSheet,  View, Image ,StatusBar} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import LoginForm from '../Components/Login/LoginForm';
const LoginScreen = () =>{
  return (
   
    <ScrollView  >
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image style={styles.logoImg} source={require('../../assets/images/LoginLogo.png')} />
        </View>

        <View style={styles.formWrapper}>
          <LoginForm />
        </View>
        
        </View>
      </ScrollView>
   
   
   
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
    justifyContent: 'center',
      height:hp('100%')+ StatusBar.currentHeight
  },
  containers: {
    flex: 1,
    alignItems: 'center'
  },
  logoImg: {
    width: wp('60%'),
    resizeMode: 'contain'
  },
  logoWrapper: {
    flex: 2,
    alignItems: "center",
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    
  },
  formWrapper: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: hp('0%'),
    backgroundColor: '#FFFFFF'
    
  }
  });
export default LoginScreen