import React , { useState }from 'react'
import { StyleSheet, View ,Text , TouchableOpacity,Modal } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TextPrimaryColor } from '../../constants/Color';
import { useDispatch } from 'react-redux';
import { signOut } from "firebase/auth";
import { logout } from '../../features/authSlice';
import { useStopWatch } from '../../hooks/useStopWatch';
import { auth } from '../../../firebase';

const AccountDetails = () => {

    const [modalVisible, setModalVisible] = useState(false);
//   stop watch hook
  const {
    reset
    } = useStopWatch();

    const dispatch = useDispatch();

    // sign out
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("User sign out");
            dispatch(logout());
            reset();
        }).catch((error) => {
            console.log(error)
        })
    }


    
  return (
      <View style={styles.container}> 
          {/* Modal */}
          <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              statusBarTranslucent={true}
              onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalHeading}>Sign Out</Text>
                      <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
                      <View style={styles.modalbtnWrapper}>
                          <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(!modalVisible)}>
                              <Text style={styles.cancleBtn}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSignOut()}>
                              <Text style={styles. signOutbtn}>Sign Out</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>

    <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Account Actions</Text>
    </View>
    <View style={styles.labelWrapper}>
        <Text style={styles.label}>Reset Password</Text>
    </View>
    {/* horizontal line */}

    <View style={styles.horizontalLine}></View>

          <TouchableOpacity style={styles.labelWrapper} onPress={() => setModalVisible(true)}>
              <Text style={styles.label}>Sign Out</Text>
          </TouchableOpacity>
          
</View>
  )
}
const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        paddingTop: hp('3%'),
        
    },
    headingWrapper: {
        backgroundColor: '#EDEDED',
        height: hp('4%'),
        justifyContent:'center',
        flexDirection:'column'
    },
    heading: {
        paddingHorizontal:wp('7%'),
        fontSize: RFPercentage(2.5),
        fontFamily: 'Poppins_400Regular',
        color: TextPrimaryColor,
    },
    label: {
        paddingVertical:hp('1.5%'),
        fontSize: RFPercentage(2.9),
        fontFamily: 'Poppins_400Regular',
        color: '#032F41',
    },
    labelWrapper: {
        paddingHorizontal:wp('7%'),
    },
    horizontalLine: {
        width: '90%',
        height: 1.3,
        backgroundColor: '#ededed',
        alignSelf: 'center',
        // paddingTop:hp('1.5%'),
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
      },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,
        // alignItems: 'center',
    },
    modalHeading: {
        fontSize: RFPercentage(3.1),
        fontFamily: 'Poppins_600SemiBold',
        color: TextPrimaryColor
    },
    modalText: {
        fontSize: RFPercentage(2.1),
        fontFamily: 'Poppins_400Regular',
        color: TextPrimaryColor
    },
    modalbtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:hp('3%')
    },
    btn: {
        paddingRight:wp('5%')
    },
    cancleBtn: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'Poppins_400Regular',
        color: '#606060'
    },
    signOutbtn: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'Poppins_400Regular',
        color: '#032F41'
    }
});


export default AccountDetails