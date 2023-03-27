import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { isPointWithinRadius } from 'geolib';
import { getGeoCoords, setIsEnter } from './storage';

const LOCATION_TASK_NAME = "GEOFENCING";

let coordinates = [];
let siteName = 'No site';

// Bg task
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error)
  {
    console.log(error, 'IN task manager');
    return;
  };
  // console.log('[tracking]', 'Received new locations', locations[0].coords );
  
  try
  {
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
      console.log('Status of geofence true');
      setIsEnter('inside');
      siteName = coords.name;
      break;
    }
    else
    {
      console.log('Status of geofence false');
      setIsEnter('outside')
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
  
// get site name
export const getSite = () =>
{
  return siteName;
}