import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const ProfileScreen = () => {
    const dispatch = useDispatch();

    // sign out
    const handleSignOut = () => {
     signOut(auth).then(() => {
       console.log("User sign out");
       dispatch(logout());
     }).catch((error) => {
         console.log(error)
     })
 }
    return (
        <View>
            <Text>ProfileScreen</Text>
            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}


export default ProfileScreen