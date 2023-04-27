import React from 'react'
import { View , StyleSheet, Text} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Image } from 'react-native';
import { TextPrimaryColor } from '../../constants/Color';


const ProfilePic = () =>
{
  return (
      <View style={styles.container}>
          <View style={styles.wrapper}>  
          <Image
              style={styles.pic}
              contentFit="contain"
              source={{ uri: 'https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg' }}
          />
          <View style={styles.textWrapper}>
              <Text style={styles.pName}>JohnDavid</Text>
              <Text style={styles.job}>Labourer</Text>
          </View>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        paddingHorizontal: wp('7%'),
        paddingTop: hp('4%'),
        // flex: 1,
        // alignItems:'center'
    },
     wrapper: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems:'center'
    },
    pic: {
        width:wp('31%'),
        height:wp('31%'),
        borderRadius:wp('31%')/2,    
    },
    textWrapper: {
        width: wp('60%'),
        paddingLeft: wp('8%'),
        // justifyContent:'center',
        alignItems:'baseline'
    },
    pName: {
        fontSize: RFPercentage(3.8),
        fontFamily: 'Poppins_600SemiBold',
        color:TextPrimaryColor
    },
    job: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'Poppins_400Regular',
        color:TextPrimaryColor
    }

})
export default ProfilePic;