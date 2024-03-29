import React, { useEffect, useState } from 'react'
import { View,StyleSheet,StatusBar, Text} from 'react-native';

import { auth, db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { PrimaryColor, TextPrimaryColor } from '../constants/Color';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../Components/Profile/Header';
import ProfilePic from '../Components/Profile/ProfilePic';
import UserDetails from '../Components/Profile/UserDetails';
import AccountDetails from '../Components/Profile/AccountDetails';
import { doc, onSnapshot } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
 
// user details
    const [user, setUser] = useState();
            
    // fetch user data
    
    const getUser = async () => {
        const ref = await doc(db, "Employees", auth.currentUser.uid);
        
        await onSnapshot(ref, (snapshot) => {
          setUser(snapshot.data());        
        });
    } 


    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            {user &&
                <>
                <ProfilePic user={user} />
                <UserDetails user={user} />
                <AccountDetails user={user}/>
                </>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + hp('1%'),
        paddingHorizontal:wp('10%')
    }
});

    export default ProfileScreen;