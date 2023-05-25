import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { PrimaryColor } from '../../constants/Color';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import moment from 'moment';

const ListOfNotification = () => {
    const [notify, setNotify] = useState();
    const [todayNoti, setTodayNoti] = useState();
    const [yesterdayNoti, setYesterdayNoti] = useState(null);
    const [olderNoti, setOlderNoti] = useState();


    
    const getNotification = async () => {
     
        
        const ref = await collection(db, "Employees", auth.currentUser.uid, "Time_tracking");
        const q = await query(ref,orderBy('time',"desc")); //date issue , 

         await onSnapshot(q, (snapshot) => {
             setNotify((snapshot.docs.map((site) => ({ id: site.id, ...site.data() }))));   
         });
    }

    const filterNotification = async () => {
        try
        {
            const currentDate = await new Date();

        // Set the time to 12 AM (midnight)
        await currentDate.setHours(0, 0, 0, 0);

        // Get the milliseconds since the start of the day
        const millisecondsSinceStartOfDay = await currentDate.getTime();

        const yesterday =  moment(millisecondsSinceStartOfDay).subtract(1, 'day')
   
        // filter today
        const filterToday = await notify.filter(notifi => {
            return notifi.time > millisecondsSinceStartOfDay;
        });
        if (filterToday)
        {
            setTodayNoti(filterToday); 
        }
        else {
            setTodayNoti(null)
        }
           

        // filter yesterday
            
        const filterYesterday = await notify.filter(notifi => {
            return (notifi.time < millisecondsSinceStartOfDay && notifi.time > yesterday) ;
        });
            
        if (filterYesterday)
        {
            setYesterdayNoti(filterYesterday);
        }
        else
        {
            setYesterdayNoti(null)
         }

            // filter older
            const filterOlder = await notify.filter(notifi => {
                return notifi.time < yesterday ;
            });

            setOlderNoti(filterOlder);
        }
        catch (error)
        {
            console.log(error ,'sss')
        }
    }

    useEffect(() => {
        getNotification();
    }, []);

    useEffect(() => { 
        filterNotification();
    }, [notify]);
    
    return (
        <View style={styles.container}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {todayNoti && <Text style={styles.heading}>Today </Text>}
                {todayNoti && todayNoti.map((notification, index) => (
                    
                    <View key={index}>
                        <View style={styles.list}>
                            <View style={styles.leftContainer}>
                                <View style={styles.icon}>
                                    <View>
                                        <Text style={styles.iconText}>{notification.Abbrevation}</Text>
                                    </View>
                                </View>
    
                                <View style={styles.wrapper}>
                                    <Text style={styles.description}>{notification.Site_name}</Text>
                                    <Text style={styles.subDesc}>{notification.type}</Text>
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
          
                {/* Yesterday */}

                {yesterdayNoti ? <Text style={styles.heading}>Yesterday</Text>
               :<View></View>}
                {yesterdayNoti && yesterdayNoti.map((notification, index) => (
                    
                    <View key={index}>
                        <View style={styles.list}>
                            <View style={styles.leftContainer}>
                                <View style={styles.icon}>
                                    <View>
                                        <Text style={styles.iconText}>{notification.Abbrevation}</Text>
                                    </View>
                                </View>
    
                                <View style={styles.wrapper}>
                                    <Text style={styles.description}>{notification.Site_name}</Text>
                                    <Text style={styles.subDesc}>{notification.type}</Text>
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

                {/* older */}
                {olderNoti &&  <Text style={styles.heading}>Older</Text>}
                {olderNoti && olderNoti.map((notification, index) => (
                    
                    <View key={index}>
                        <View style={styles.list}>
                            <View style={styles.leftContainer}>
                                <View style={styles.icon}>
                                    <View>
                                        <Text style={styles.iconText}>{notification.Abbrevation}</Text>
                                    </View>
                                </View>
    
                                <View style={styles.wrapper}>
                                    <Text style={styles.description}>{notification.Site_name}</Text>
                                    <Text style={styles.subDesc}>{notification.type}</Text>
                                </View>
                            </View>

                            <View style={styles.DateWrapper}>
                                <Text style={styles.time}>{moment(notification.time).format("MMM D")}</Text>
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
    DateWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent:'center'
    }
})