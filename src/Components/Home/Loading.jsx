import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { SkeletonLoading } from './SkeletonLoading'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const Loading = () => {
  return (
    <View style={styles.container}>
      {/* Summary */}
      <SkeletonLoading background={'#DCDCDC'} highlight={'#EEEEEE'}>
        <View style={styles.skeMainHeading}></View>
      </SkeletonLoading>
      {/* Timmer */}
      <View style={styles.timerBox}>
        <SkeletonLoading background={'#DCDCDC'} highlight={'#eeeeee'}>
          <View>
            <View style={styles.subHeading} />
            <View style={styles.timerWrapper}>
              <View style={styles.timeContainer} />

              <View style={styles.btnWrapper}>
                <View style={styles.btn}>
                  <View style={styles.iconWrapper}>
                    <View style={styles.icon} />
                    <View style={styles.timer} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottomWrap}>
              <View style={styles.locationIcon} />
              <View style={styles.locationText} />
            </View>
          </View>
        </SkeletonLoading>
      </View>

      {/* Activity Details */}
      <SkeletonLoading background={'#DCDCDC'} highlight={'#EEEEEE'}>
        <View>
          <View style={styles.actText}></View>

          <View style={styles.actBox}>
            <View style={styles.timeBox}>
              <View style={styles.label} />
              <View style={styles.timeText} />
            </View>

            {/* vertical line */}
            <View style={styles.verticalLine}></View>
            <View style={styles.timeBox}>
              <View style={styles.label} />
              <View style={styles.timeText} />
            </View>
          </View>
        </View>
      </SkeletonLoading>

      {/* summary */}
      <View style={styles.summaryBox}>
        <View style={styles.timeLogWrapper}>
          <SkeletonLoading background={'#DCDCDC'} highlight={'#EEEEEE'}>
            <View>
              <View style={styles.subHeading} />
              <View style={styles.timeLog} />
            </View>
          </SkeletonLoading>
        </View>

        {/* horizontal line */}

        <View style={styles.horizontalLine}></View>
        <View style={styles.timeLogWrapper}>
          <SkeletonLoading background={'#DCDCDC'} highlight={'#EEEEEE'}>
            <View>
              <View style={styles.subHeading} />
              <View style={styles.timeLog} />
            </View>
          </SkeletonLoading>
        </View>
      </View>
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
  timerBox: {
    marginTop: hp('2%'),
    backgroundColor: '#BCBCBC',
    width: wp('90%'),
    height: hp('22%'),
    borderRadius: hp('1.5%'),
    padding: hp('2%'),
    justifyContent: 'space-around',
  },
  // Skeleton
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
    width: wp('30%'),
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
    backgroundColor: '#BCBCBC',
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
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  },
  timeLogWrapper: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
})

export default Loading
