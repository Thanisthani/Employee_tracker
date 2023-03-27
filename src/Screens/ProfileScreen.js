import React from 'react'
import { Text, TouchableOpacity, View,StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { PrimaryColor } from '../constants/Color';
import { useStopWatch } from '../hooks/useStopWatch';


const ProfileScreen = () => {
      // stop watch hook
  const {
    time,
    start,
    stop,
    reset,
    isRunning,
    dataLoaded
    } = useStopWatch();
    
    // const dispatch = useDispatch();

    // // sign out
    // const handleSignOut = () => {
    //  signOut(auth).then(() => {
    //    console.log("User sign out");
    //    dispatch(logout());
    //  }).catch((error) => {
    //      console.log(error)
    //  })
//  }
    return (
        <View style= {styles.container}>
            <Text>ProfileScreen</Text>
            {/* <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity> */}
            <View>
                <Text style={styles.timer}>{time}</Text>

                <TouchableOpacity onPress={() =>start()} style={styles.btn}>
                    <Text style={styles.btnText}>Start</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>stop()} style={styles.btn}>
                    <Text style={styles.btnText}>Stop</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>reset()} style={styles.btn}>
                    <Text style={styles.btnText}>Reset</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
    paddingTop:20
    },
    timer: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 30,
       paddingTop:20
    },
    btn: {
        backgroundColor: PrimaryColor,
        padding: 5,
        marginBottom: 30,
        width: '30%',
        height:'20%'
       
    },
    btnText: {
        color: '#fff',
        fontSize:17
    }
});

export default ProfileScreen