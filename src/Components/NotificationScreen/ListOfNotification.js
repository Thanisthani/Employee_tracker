import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { PrimaryColor } from '../../constants/Color';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import moment from 'moment';

const ListOfNotification = () => {
    const [notify, setNotify] = useState();

    //  contvert two digit
    const padStart = (num) => {
        return num.toString().padStart(2, "0");
      };
    
    // format check in time
  
    const formatTime = async (time) => {
      try
      {
        const timeStamp = await new Date(time);
        let minutes = await timeStamp.getMinutes();
        let hours = await timeStamp.getHours();
        const str = `${padStart(hours)}:${padStart(minutes)}`;
        return str ;
      }catch (error)
      {
        console.log("error on format ",error)
      }
    }

    const getNotification = async () => {
        const ref = await collection(db, "Employees", auth.currentUser.uid, "Time_tracking");
        const q = query(ref, where ("time",">",Date.now()),orderBy('time',"desc")); //date issue

         await onSnapshot(q, (snapshot) => {
             setNotify((snapshot.docs.map((site) => ({ id: site.id, ...site.data() }))));   
         });
    }

    useEffect(() => {
        getNotification();
    }, []);
    
    return (
        <View style={styles.container}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>Today </Text>
                {notify && notify.map((notification,index) => (
                    
                    <View key={index}>
                        <View style={styles.list}>
                        <View style={styles.leftContainer}>
                            <View style={styles.icon}>
                                <View>
                                        <Text style={styles.iconText}>{ notification.Abbrevation}</Text>
                                </View>
                            </View>
    
                            <View style={styles.wrapper}>
                                <Text style={styles.description}>{ notification.Site_name}</Text>
                                <Text style={styles.subDesc}>{ notification.type}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.time}>{moment(notification.time).format("hh:mm a")}</Text>
                        </View>
                    </View>

                 {/* horizontal line */}

                    {/* <View style={styles.horizontalLine}></View> */}
                    </View>
                ))}
          
            </ScrollView>
        </View>
        
  )
}

export default ListOfNotification

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingTop: hp('3%'),
        height:hp('85%')
    },
    heading: {
        fontFamily: 'Poppins_700Bold',
        color: '#090A0A',
        fontSize: RFPercentage(2.8),
    },
    list: {
        flexDirection: 'row',
        width: wp('85%') ,
        alignItems: 'flex-start',
        paddingVertical: hp('2%'),
        justifyContent: 'space-between',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth:0.19
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: wp('15%'),
        height:wp('15%'), 
        backgroundColor: PrimaryColor,
        borderRadius: wp('15%') / 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconText: {
        color:'#FFFFFF',
        fontSize: RFPercentage(1.7),
        fontFamily: 'Poppins_700Bold',
        // padding:wp('5%')
    },
    wrapper: {
        paddingLeft:wp('3%') 
    },
    description: {
        color: '#000000',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: RFPercentage(2.2)
    },
    subDesc: {
        color: '#000000',
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(1.9)
    },
    time: {
        color:'#6C7072',
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(1.8)

    },
    horizontalLine: {
        width: wp('96%'),
        height: 0.2,
        backgroundColor: '#d6d6d6',
        alignSelf:'center'
      },
})