import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const padStart = (num) => {
  return num.toString().padStart(2, "0");
};

const formatMs = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  minutes = minutes % 60;
  seconds = seconds % 60;

  let str = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;

  return str;
};

const ASYNC_KEYS = {
  timeWhenLastStopped: "useStopWatch::timeWhenLastStopped",
  isRunning: "useStopWatch::isRunning",
  startTime: "useStopWatch::startTime"
};

export function  useStopWatch()
{
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timeWhenLastStopped, setTimeWhenLastStopped] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const interval = useRef();

  useEffect(() => {
    // load data from async storage in case app was quit
    const loadData = async () => {
      try {
        const persistedValues = await AsyncStorage.multiGet([
          ASYNC_KEYS.timeWhenLastStopped,
          ASYNC_KEYS.isRunning,
          ASYNC_KEYS.startTime
        ]);

        const [
          persistedTimeWhenLastStopped,
          persistedIsRunning,
          persistedStartTime
        ] = persistedValues;

        setTimeWhenLastStopped(
          persistedTimeWhenLastStopped[1]
            ? parseInt(persistedTimeWhenLastStopped[1])
            : 0
        );
        setIsRunning(persistedIsRunning[1] === "true");
        setStartTime(
          persistedStartTime[1] ? parseInt(persistedStartTime[1]) : 0
        );
        setDataLoaded(true);
      } catch (e) {
        console.log("error loading persisted data", e);
        setDataLoaded(true);
      }
    };
    const interval = setInterval(async () => {
      loadData();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // persist the latest data to async storage to be used later, if needed
    const persist = async () => {
      try {
        await AsyncStorage.multiSet([
          [ASYNC_KEYS.timeWhenLastStopped, timeWhenLastStopped.toString()],
          [ASYNC_KEYS.isRunning, isRunning.toString()],
          [ASYNC_KEYS.startTime, startTime.toString()],
        ]);
      } catch (e) {
        // console.log("error persisting data");
      }
    };

    if (dataLoaded) {
      persist();
    }
  }, [timeWhenLastStopped, isRunning, startTime, dataLoaded]);

  // interval timer
  useEffect(() => {
    if (startTime > 0)
    {
      interval.current = setInterval(() => {
        setTime(() => Date.now() - startTime + timeWhenLastStopped);
      }, 1);
    }
    else
    {
      if (interval.current)
      {
        setTimeWhenLastStopped(time);
        clearInterval(interval.current);
        interval.current = undefined;
      }
    }
  }, [startTime]);

  // start timer
  const start = async () =>
  {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  // stop timer
  const stop = async () =>
  {
    setIsRunning(false);
    setStartTime(0);
  };

  // reset timer
  const reset = async () =>
  {
    console.log("timer reset")
    setIsRunning(false);
    setTime(0);
    setStartTime(0);
    setTimeWhenLastStopped(0);
  };

  return {
    start,
    stop,
    reset,
    isRunning,
    time: formatMs(time),
    dataLoaded,
    actualTime:time
  };
};
