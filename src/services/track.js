import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { isPointWithinRadius } from 'geolib';
import { checkTimer, getGeoCoords, setIsEnter, startTime, stopTime } from './storage';
import { auth, db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const LOCATION_TASK_NAME = "GEOFENCING";

let coordinates = [];
let siteName = 'No site';

// Bg task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data: { locations }, error }) => {
  if (error)
  {
    console.log(error, 'IN task manager');
    return;
  };
  
  try
  {
    let isRunning = await checkTimer();
    let isEnter =  false;
    // Check point whether it's inside geofence or not
    for (coords of coordinates)
    {
      console.log('coords name', coords.name);
      const status= isPointWithinRadius(
        { latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude },
        { latitude: coords.latitude, longitude: coords.longitude }, 
        coords.radius  //Geofence Radius
      );
       // Store geofence status on local storage
    if (status)
    {
      console.log('Status of  geofence true');
     
     isEnter = await true;
      break;
    }
    else
    {
      console.log('Status of  geofence false');
      isEnter = await false;
    }
    }
    // trigger app
    if (isEnter)
    {
      console.log('After for loop');
     
      if (!isRunning)
      {
        await startTime();
        await setCurrentStatus(Date.now(), null,coords.name);
        console.log('timmer start now')
        }
      setIsEnter('inside');
      siteName = coords.name;
   
    }
    else
    {
      console.log('After loop Status of geofence false test', isRunning);
      isRunning = await checkTimer();
      setIsEnter('outside');
      if (isRunning)
      {
        console.log('stop time now',isRunning)
        await stopTime();
        await setCurrentStatus(null,Date.now());
      }
    }
 
  }
  catch (error)
  {
    console.log('task manger erfror', error);
  }
});


  
  // start location updates
 export const locationUpdate = async () =>
 {
    coordinates =  await getGeoCoords();
     
    // Check task manager defined or not
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);

    if (!isTaskDefined)
    {
      console.log("Task is not defined ")
      return
    }

    // Live location update
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval:5 * 1000, //time duration to check location
      // android behavior
      foregroundService: {
        notificationTitle: 'Employee tracker is active',
        notificationBody: 'Monitoring your location in background',
        notificationColor: '#333333',
      },
      // ios behavior
      activityType: Location.ActivityType.Fitness,
      showsBackgroundLocationIndicator: true,
    });
    console.log('[tracking]', 'started background location task');
}

//  stop geofence

export const stopLocationUpdate = async () => {
  
  // await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
  // console.log('BG task stoped');
}
  
// get site name
export const getSite = () =>
{
  return siteName;
}

// Store check in & check out time & current site on firestore
export async function setCurrentStatus(checkIn, checkOut,site) {
  const userID = await auth.currentUser.uid;
  if (checkIn != null)
  {
    await updateDoc(doc(db, 'Employees', userID), {
      Check_in: checkIn,
      Check_out: checkOut,
      Site_name: site
    });
  }
  else
  {
    await updateDoc(doc(db, 'Employees', userID), {
      Check_out: checkOut
    });
  }
}