import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { isPointWithinRadius } from 'geolib';
import { checkTimer, getGeoCoords, setIsEnter, startTime, stopTime } from './storage';
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

const LOCATION_TASK_NAME = "GEOFENCING";

let coordinates = [];
let siteName = 'No site';
let siteAbb = '';

// Bg task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data: { locations }, error }) => {
  if (error)
  {
    // console.log(error, 'IN task manager');
    return;
  };
  
  try
  {
    let isRunning = await checkTimer();
    let isEnter =  false;
    // Check point whether it's inside geofence or not
    for (coords of coordinates)
    {
      // console.log('coords name', coords.name);
      const status= isPointWithinRadius(
        { latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude },
        { latitude: coords.latitude, longitude: coords.longitude }, 
        coords.radius  //Geofence Radius
      );
       // Store geofence status on local storage
    if (status)
    {
      // console.log('Status of  geofence true');
      siteName = await coords.name;
      siteAbb = await coords.site_abb;
      isEnter = await true;
      break;
    }
    else
    {
      // console.log('Status of  geofence false');
      isEnter = await false;
    }
    }
    // trigger app
    if (isEnter)
    {
      
      if (!isRunning)
      {
        await startTime();
        await setCurrentStatus(Date.now(), null,siteName,siteAbb);
        // console.log('timmer start now')
        }
      setIsEnter('inside');
   
    }
    else
    {
      isRunning = await checkTimer();
      setIsEnter('outside');
      if (isRunning)
      {
        // console.log('stop time now', siteName);
        await stopTime();
        await setCurrentStatus(null,Date.now(),siteName,siteAbb);
      }
    }
 
  }
  catch (error)
  {
    // console.log('task manger erfror', error);
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
      // console.log("Task is not defined ")
      return
    }

    // Live location update
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval:2* 60 * 1000, //time duration to check location
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
    // console.log('[tracking]', 'started background location task');
}

//  stop geofence
export const stopLocationUpdate = async () => {
  await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
  isRunning = await checkTimer();
  if (isRunning)
  {
    await setCurrentStatus(null,Date.now(),siteName,siteAbb);
  }
}
  
// get site name
export const getSite = () =>
{
  return siteName;
}

// Store check in & check out time & current site on firestore
export async function setCurrentStatus(checkIn, checkOut,site,abb) {
  const userID = await auth.currentUser.uid;
  if (checkIn != null)
  {

    await updateDoc(doc(db, 'Employees', userID), {
      Check_in: checkIn,
      Check_out: null,
      Site_name: site
    });

    await addDoc(collection(db, 'Employees', userID, 'Time_tracking'),
      {
        Site_name:site,
        Abbrevation:abb,
        time: checkIn,
        type:'Checked-In'
    });
  }
  else
  {
    await updateDoc(doc(db, 'Employees', userID), {
      Check_out: checkOut
    }); 
    await addDoc(collection(db, 'Employees', userID, 'Time_tracking'),
    {
      Site_name: site,
      Abbrevation: abb,
      time: checkOut,
      type: 'Checked-Out'
      });
  }
}