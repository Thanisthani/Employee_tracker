import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons,FontAwesome5,Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen'
import { StyleSheet, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: hp('10%') }
      }} >
          
          <Tab.Screen name="Home" component={HomeScreen} options={{ 
              tabBarIcon: ({ color, size, focused }) => (
                  <View  style={styles.iconWrapper}>
                      <Octicons name="home" size={RFPercentage(4)} color={focused ? "#032F41" : "#979C9E"}/>
                  </View>
              )
          }} />

<Tab.Screen name="Profile" component={ProfileScreen} options={{ 
              tabBarIcon: ({ color, size, focused }) => (
        <View style={styles.iconWrapper}>
            <FontAwesome5 name="user" size={RFPercentage(4)} color={focused ? "#032F41" : "#979C9E"} />
        </View>
              )
          }} />

<Tab.Screen name="Notification" component={NotificationScreen} options={{ 
              tabBarIcon: ({ color, size, focused }) => (
        <View style={styles.iconWrapper}>
            <Octicons name="bell" size={RFPercentage(4)} color={focused ? "#032F41" : "#979C9E"} />
        </View>
              )
          }} />

      </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    iconWrapper: {
        padding: 5,
        alignItems: "center",
        justifyContent:"center"
   
    },
    bottomText: {
        fontSize: 11,
        color: "#9b9b99",
        fontWeight: "bold",
        
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height:10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation:10
    }
})
export default BottomNavigation