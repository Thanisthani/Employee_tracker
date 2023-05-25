import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor } from '../../constants/Color';
import { db } from '../../../firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from '../../features/authSlice';
import Moment from 'moment';
import moment from 'moment';


const ActivityDetails = ({user,userID}) => {
  // const [currentStatus, setCurrentStatus] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckout] = useState(null);
  const [last, setLast] = useState();
  const [workLog, setWorkLog] = useState(null);

  const date = new Date()
  const yesterday = Moment(date).subtract(1, 'day').format('YYYY-MM-DD'); 

  const dispatch = useDispatch();

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

  const storeTime = async () => {
    try {
      if (user)
      {
        if (user.Check_in != null)
          {
        await console.log('check in tym',user.Check_in.seconds);
          const checkin = await formatTime(user.Check_in);
          // const checkin = await moment (user.Check_in.seconds).format("hh:mm a ");
          await setCheckIn(checkin);
        }
        else {
          await setCheckIn(null);
        }
        if ( user.Check_out != null)
        {
          const checkout = await formatTime(user.Check_out);
          // const checkout = await moment (user.Check_out).format("hh:mm ");
          await setCheckout(checkout);
        } 
        else {
          setCheckout(null);
        }
        await dispatch(loadingStop());
      }
    }
    catch (error)
    {
      console.log('Error on store tym fn',error)
    }

  }

  // Get yesterday duration

  const getYesterdayLog = async () => {
    
    const ref = await collection(db, "Employees", userID, "Working_hours")
    const q = await query(ref,where("Date", "==", yesterday))
   await  onSnapshot(q, (snapshot) =>
      setLast((snapshot.docs.map((log) => ({ id: log.id, ...log.data() }))))
    )
  }

  // fromat last session
  const getLogDuration = async () => {
    try {
      if (last)
      {
      const timeStamp = await new Date(last[0].Duration);
      let minutes = await timeStamp.getMinutes();
      let hours = await timeStamp.getHours();
      const str = `${padStart(hours)} hours ${padStart(minutes)} minutes`;
      setWorkLog(str);
    }
    }
    catch (error)
    {
      console.log("getLogDuration ",error)
    }
  }
  


  useEffect(() => {
    getYesterdayLog();
  }, []);
  
  useEffect(() => {
    getLogDuration();
  },[last])
  
  useEffect(() => {
    storeTime();
  }, [user]);

  return (
    <>
      <Text style={styles.actText}>Activity Details</Text>

      <View style={styles.actBox}>
        <View style={styles.timeBox}>
          <Text style={styles.label}>In time</Text>
          <Text style={styles.timeText}>{checkIn ? checkIn : '00:00'}</Text>
        </View>

        {/* vertical line */}
        <View style={styles.verticalLine}></View>
        <View style={styles.timeBox}>
          <Text style={styles.label}>Out time</Text>
          <Text style={styles.timeText}>{checkOut ? checkOut : '00:00'}</Text>
        </View>
  
      </View>

       {/* summary */}
       <View style={styles.summaryBox}>
        <View style={styles.timeLogWrapper}>
          <Text style={styles.subHeading}>Last Session:</Text>
          {workLog ? <Text style={styles.timeLog}>{ workLog}</Text>
            :
            <Text style={styles.timeLog}>00 hours 00 minutes</Text>
          }
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
        marginVertical: hp('1%')
      },
      actBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf:'center',
        width:wp('70%')
        
      },
      timeBox: {
        justifyContent: 'center',
        alignItems:'center'
      },
      label: {
        fontFamily: 'Poppins_400Regular',
        fontSize: RFPercentage(2.5),
        color:'#636363'
      },
      timeText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: RFPercentage(4),
        color: PrimaryColor,
      },
      verticalLine: {
        width: 0.5,
        height: '100%',
        backgroundColor:'#636363'
  },
  subHeading: {
    fontFamily: 'Poppins_400Regular',
    fontSize: RFPercentage(2.5),
    color:'#c1c1c1'
  },
  summaryBox: {
    marginTop:hp('3%'),
    backgroundColor: PrimaryColor,
    width: wp('90%'),
    height: hp('28%'),
    borderRadius: hp('1.5%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    justifyContent:'space-between'
  },
  timeLog: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: RFPercentage(3),
    color:'#ffffff'
  },
  horizontalLine: {
    width: wp('90%'),
    height: 0.39,
    backgroundColor: '#043d54',
    alignSelf:'center'
  },
  timeLogWrapper: {
    justifyContent: 'space-evenly',
    flex:1
  }
});
export default ActivityDetails