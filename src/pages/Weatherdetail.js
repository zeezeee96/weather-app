import React, { useState, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import {getCityDetail} from '../services/request-service' 
import { BrowserRouter as Router, useParams} from "react-router-dom";
 const Weatherdetails= ()=> {
const {id, name} = useParams()

  const [weatherinfo, setWeatherInfo] = useState({});
  let history = useHistory();

  useEffect (() => {
    getCityDetail(id).then((data) => {
      console.log(data[0])
      setWeatherInfo(data[0])});
  },[])
const callHome = () => {
  history.push("/");
}
  return (
      <div>
        {weatherinfo.Temperature && (
          <div>
        <h3>{name}</h3>
        <h4>{weatherinfo.Temperature.Metric.Value}<sup>&deg;</sup>C</h4>
        <h5>{weatherinfo.WeatherText}</h5>
        </div>
        )}
       
{/* {weatherinfo.main && (
      <div>
        <h3>
          <span>{weatherdata.name}</span>
          <sup>{weatherdata.sys.country}</sup>
          </h3>
        <h4>{weatherdata.main.temp}<sup>&deg;C</sup></h4>
        <div>
          <img src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}.png`}/>
          <p>{weatherdata.weather[0].description}</p>
        </div>
      </div>
      )
      } */}


<button onClick={()=>callHome()}>Back to Search</button>
      </div>
  )
}
export default Weatherdetails;
