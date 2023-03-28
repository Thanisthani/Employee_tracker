import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { RFPercentage } from 'react-native-responsive-fontsize';
import { PrimaryColor } from '../../constants/Color';
import { db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from '../../features/authSlice';

const TRIGGER_TASK = 'trigger';

const ActivityDetails = ({userID}) => {
  const [currentStatus, setCurrentStatus] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckout] = useState(null);

  const dispatch = useDispatch();

    const getStatusTime =async () => {
      try {
       await dispatch(loadingStart());
        const ref = await doc(db, "Employees", userID);
            
        await onSnapshot(ref, (snapshot) => {
          setCurrentStatus(snapshot.data());        
        });

        }
        catch (error)
        {
            console.log(error.stack,'firebase');
        }
    }

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
      if (currentStatus)
      {
        const checkin = await formatTime(currentStatus.Check_in);
        await setCheckIn(checkin);
        if (currentStatus.Check_out != null)
        {
          const checkout = await formatTime(currentStatus.Check_out);
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

    useEffect(() => {
        getStatusTime();
    }, []);
  
  useEffect(() => {
    storeTime();
  }, [currentStatus]);


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
    </>
  )
}


const styles = StyleSheet.create({
    actText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: RFPercentage(3.2),
        color: PrimaryColor,
        marginVertical: hp('2%')
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
});
export default ActivityDetails