
import { useRef } from 'react';
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {

  let [min,setMin]=useState(0)
  let [sec,setSec]=useState(0)
  let [ms,setMs]=useState(0)
  let [lap,setLap]=useState([])

  const intervalId = useRef(null);  

  function handleStart() {
    if (intervalId.current) return;  

    intervalId.current = setInterval(() => {
      setMs((prevMs) => {
        const newMs = (prevMs + 1) % 100;
        if (newMs === 0) {
          setSec((prevSec) => {
            const newSec = prevSec + 1;
            if (newSec === 60) {
              setMin((prevMin) => prevMin + 1);
              return 0;
            }
            return newSec;
          });
        }
        return newMs;
      });
    }, 10);  
  }
      
    
  function handleStop(){
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null; 
    }
  }

  function handleReset(){
    clearInterval(intervalId.current);  
    intervalId.current = null;
    setMs(0);
    setSec(0);
    setMin(0);
    setLap([])
  }

  function handleLap(){
    const formatTime = (min, sec, ms) => {
      return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}:${ms < 10 ? '0' + ms : ms}`;
    }
    // setLap([formatTime(min,sec,ms)])
    // setLap([min,sec,ms])
    // console.log(lap)
    const formatted = formatTime(min, sec, ms);
    setLap((prev) => [...prev, formatted]);
  }
  

  return (
    <div>
        {/* Do not remove the main div */}
        <h1>Timer</h1>
        <p>{min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}:{ms < 10 ? '0' + ms : ms}</p>
        <button onClick={handleStart} >Start</button>
        <button onClick={handleStop} >Stop</button>
        <button onClick={handleLap} >Lap</button>
        <button onClick={handleReset} >Reset</button>
        <ul>
        {
          lap.map((laps,index)=>(
            <li key={index} >{laps}</li>
          ))
        }
        </ul>
    </div>
  )
}

export default App
