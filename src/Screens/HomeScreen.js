import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { PrimaryColor, TextPrimaryColor } from '../constants/Color'
import GeoFencing from '../Components/Home/GeoFencing'
import { auth, db } from '../../firebase'
import ActivityDetails from '../Components/Home/ActivityDetails'
import { doc, onSnapshot } from 'firebase/firestore'
import { SkeletonLoading } from '../Components/Home/SkeletonLoading'
import { useStopWatch } from '../hooks/useStopWatch'
import { Feather } from '@expo/vector-icons'
import Loading from '../Components/Home/Loading'

const HomeScreen = () => {
  const { dataLoaded } = useStopWatch()
  const [currentUser, setCurrentUser] = useState(
    auth.currentUser.uid ? auth.currentUser.uid : null
  )
  const [loading, setLoading] = useState(false)

  // user details
  const [user, setUser] = useState()

  // fetch user data

  const getUser = async () => {
    try {
      await setLoading(true)
      const ref = await doc(db, 'Employees', auth.currentUser.uid)

      await onSnapshot(ref, (snapshot) => {
        setUser(snapshot.data())
      })
      await setLoading(false)
    } catch (error) {
      console.log('Home err:', error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!dataLoaded || !(currentUser && user)) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Summary</Text>
      <GeoFencing userID={currentUser} site={user.Site_name} />
      <ActivityDetails user={user} userID={currentUser} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    paddingTop: StatusBar.currentHeight + hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  mainHeading: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(5),
    color: TextPrimaryColor,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Skeleton
  SkeletonContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    paddingTop: StatusBar.currentHeight + hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  skeMainHeading: {
    width: wp('60%'),
    height: hp('5%'),
    backgroundColor: '#adadad',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 5,
  },
  subHeading: {
    width: wp('40%'),
    height: hp('2%'),
    backgroundColor: '#adadad',
    borderRadius: 5,
  },
  timerWrapper: {
    alignItems: 'baseline',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
  },
  timer: {
    width: wp('10%'),
    height: hp('1.5%'),
    backgroundColor: '#adadad',
    marginTop: hp('1%'),
    borderRadius: 3,
  },
  bottomWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  timeContainer: {
    flex: 3,
    alignItems: 'center',
    width: wp('40%'),
    height: hp('5%'),
    backgroundColor: '#adadad',
    borderRadius: 5,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  icon: {
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: 50,
    backgroundColor: '#adadad',
  },
  locationText: {
    width: wp('25%'),
    height: hp('3%'),
    backgroundColor: '#adadad',
    marginLeft: wp('5%'),
    borderRadius: 5,
  },
  locationIcon: {
    width: hp('3%'),
    height: hp('3%'),
    borderRadius: 50,
    backgroundColor: '#adadad',
  },
  actText: {
    width: wp('60%'),
    height: hp('4%'),
    backgroundColor: '#adadad',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    borderRadius: 5,
  },
  actBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('85%'),
  },
  timeBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: wp('25%'),
    height: hp('3%'),
    backgroundColor: '#adadad',
    marginBottom: hp('1%'),
    borderRadius: 5,
  },
  timeText: {
    width: wp('30%'),
    height: hp('5%'),
    backgroundColor: '#adadad',
    borderRadius: 5,
  },
  verticalLine: {
    width: 0.5,
    height: '100%',
    backgroundColor: '#636363',
  },
  summaryBox: {
    marginTop: hp('3%'),
    backgroundColor: '#4A4A4A',
    width: wp('90%'),
    height: hp('28%'),
    borderRadius: hp('1.5%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    justifyContent: 'space-between',
  },
  timeLog: {
    width: wp('70%'),
    height: hp('3.5%'),
    backgroundColor: '#adadad',
    borderRadius: 5,
    marginTop: hp('2%'),
  },
  horizontalLine: {
    width: wp('90%'),
    height: 0.39,
    backgroundColor: '#043d54',
    alignSelf: 'center',
  },
  timeLogWrapper: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
})

export default HomeScreen
