import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';


const geofenceStorageName = 'geo';
const geoCoordinates = 'geoCoord';
const statusStorage = 'status';
const checkInTime = 'checkIn';
const checkOutTime = 'checkOut';
const ASYNC_KEYS = {
  timeWhenLastStopped: "useStopWatch::timeWhenLastStopped",
  isRunning: "useStopWatch::isRunning",
  startTime: "useStopWatch::startTime"
};

// Get value in local storage
export  async function isEnter () {

  const data = await AsyncStorage.getItem(geofenceStorageName);

  if (data == 'inside')
  {
        return 'inside';
  }
  else
  {
        return 'outside'
  };
    
}

// Set value in local storage
export async function setIsEnter(enter){
  await AsyncStorage.setItem(geofenceStorageName, enter);
}

// set coordinates in local storage
export async function setGeoCoords(coords) {
  await AsyncStorage.removeItem(geoCoordinates);
  await AsyncStorage.setItem(geoCoordinates, JSON.stringify(coords));
}
// get coordinates in local storage
export async function getGeoCoords()
{
  const data = await AsyncStorage.getItem(geoCoordinates);
  return data ? JSON.parse(data) : [];
}
  
export async function setIsStartStorage(start)
{
  await AsyncStorage.setItem(statusStorage, start.toString());
}

export async function getIsStart() {
  const data = await AsyncStorage.getItem(statusStorage);

  return data;
}

// trigger timer
export async function startTime() {
  const time = await Date.now();
  await AsyncStorage.multiSet([
    [ASYNC_KEYS.isRunning, true.toString()],
    [ASYNC_KEYS.startTime, time.toString()],
  ]);
} 

// stop timer
export async function stopTime() {
  let startTime = await AsyncStorage.getItem(ASYNC_KEYS.startTime);
  if (!startTime)
  {
    startTime = await  0;
  }

  const lap = await Date.now() - parseInt(startTime);
  const time = await 0;
  
  await AsyncStorage.multiSet([
    [ASYNC_KEYS.timeWhenLastStopped, lap.toString()],
    [ASYNC_KEYS.isRunning, false.toString()],
    [ASYNC_KEYS.startTime, time.toString()],
  ]);
}



export async function checkTimer() {
  const data = await AsyncStorage.getItem(ASYNC_KEYS.isRunning);

  if (data == 'true')
  {
    return true;
  }
  else {
    return false;
  }

}

// Get check in & check out time
export async function getCurrentStatus() {
  
  const data = await AsyncStorage.multiGet([
    checkInTime,
    checkOutTime.toString()
  ]);

  return data;
}