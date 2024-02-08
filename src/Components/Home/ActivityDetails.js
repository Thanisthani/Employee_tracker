import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { PrimaryColor } from '../../constants/Color'
import { db } from '../../../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import Moment from 'moment'
import moment from 'moment'

const ActivityDetails = ({ user, userID }) => {
  const [last, setLast] = useState([])

  const date = new Date()
  const yesterday = Moment(date).subtract(1, 'day').format('YYYY-MM-DD')

  // Get yesterday duration

  const getYesterdayLog = async () => {
    try {
      const ref = await collection(db, 'Employees', userID, 'Working_hours')
      const q = await query(ref, where('Date', '==', yesterday))
      await onSnapshot(q, (snapshot) => {
        setLast(snapshot.docs.map((log) => ({ id: log.id, ...log.data() })))
      })
    } catch (error) {
      console.log('Act errorr', error)
    }
  }

  useEffect(() => {
    getYesterdayLog()
  }, [])

  return (
    <>
      <Text style={styles.actText}>Activity Details</Text>

      <View style={styles.actBox}>
        <View style={styles.timeBox}>
          <Text style={styles.label}>In time</Text>
          <Text style={styles.timeText}>
            {user.Check_in ? moment(user.Check_in).format('hh:mm a') : '00:00'}
          </Text>
        </View>

        {/* vertical line */}
        <View style={styles.verticalLine}></View>
        <View style={styles.timeBox}>
          <Text style={styles.label}>Out time</Text>
          <Text style={styles.timeText}>
            {user.Check_out
              ? moment(user.Check_out).format('hh:mm a')
              : '00:00'}
          </Text>
        </View>
      </View>

      {/* summary */}
      <View style={styles.summaryBox}>
        <View style={styles.timeLogWrapper}>
          <Text style={styles.subHeading}>Last Session:</Text>
          {last.length != 0 ? (
            <Text style={styles.timeLog}>
              {moment(last[0].Duration).format('hh')} hours{' '}
              {moment(last[0].Duration).format('mm')} minutes
            </Text>
          ) : (
            <Text style={styles.timeLog}>00 hours 00 minutes</Text>
          )}
        </View>

        {/* horizontal line */}

        <View style={styles.horizontalLine}></View>
        <View style={styles.timeLogWrapper}>
          <Text style={styles.subHeading}>Week Total:</Text>
          <Text style={styles.timeLog}>08 hours 32 minutes</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  actText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(3.2),
    color: PrimaryColor,
    marginVertical: hp('1.5%'),
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
    fontFamily: 'Poppins_400Regular',
    fontSize: RFPercentage(2.5),
    color: '#636363',
  },
  timeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(3.5),
    color: PrimaryColor,
  },
  verticalLine: {
    width: 0.5,
    height: '100%',
    backgroundColor: '#636363',
  },
  subHeading: {
    fontFamily: 'Poppins_400Regular',
    fontSize: RFPercentage(2.5),
    color: '#c1c1c1',
  },
  summaryBox: {
    marginTop: hp('3%'),
    backgroundColor: PrimaryColor,
    width: wp('90%'),
    height: hp('28%'),
    borderRadius: hp('1.5%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    justifyContent: 'space-between',
  },
  timeLog: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(3),
    color: '#ffffff',
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
export default ActivityDetails
