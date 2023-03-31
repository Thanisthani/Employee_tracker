import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';


const geofenceStorageName = 'geo';
const geoCoordinates = 'geoCoord';
const statusStorage = 'status'

// Get value in local storage
export  async function isEnter () {

  const data = await AsyncStorage.getItem(geofenceStorageName);

  if (data == 'inside')
  {
      // console.log('local storage true')
        return 'inside';
  }
  else
  {
    // console.log('local storage false')
        return 'outside'
  };
    
}

// Set value in local storage
export async function setIsEnter(enter){
  await AsyncStorage.setItem(geofenceStorageName, enter);
  // const data = await AsyncStorage.getItem(geofenceStorageName)
  // console.log('async local set data',data)
}

// set coordinates in local storage
export async function setGeoCoords(coords) {
  // console.log("Set geo coordinates", coords);
  await AsyncStorage.removeItem(geoCoordinates);
  await AsyncStorage.setItem(geoCoordinates, JSON.stringify(coords));
}
// get coordinates in local storage
export async function getGeoCoords()
{
  const data = await AsyncStorage.getItem(geoCoordinates);
  return data ? JSON.parse(data) : [];
}
  
export async function setIsStartStorage(start) {
  await AsyncStorage.setItem(statusStorage, start.toString());
}

export async function getIsStart() {
  const data = await AsyncStorage.getItem(statusStorage);

  return data;
}
// store on redux

// export const getStatus = async () => {

//   const geoFence = useSelector((state) => state.geo);

//   return geoFence.isEnter;
// }

// export const setStatus = async (status)=>{
//   const dispatch = useDispatch(); 
//   if (status == 'true')
//   {
//     dispatch(geoEnter());
//   }
//   else {
//     dispatch(geoNotEnter());
//   }

// }