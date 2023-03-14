import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const HomeScreen = () => {


  return (
    <View style={styles.container}>
      <Text >HomeScreen</Text>
      <TouchableOpacity style={{backgroundColor:'blue',padding:10} }onPress={handleSignOut}>
<Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default HomeScreen