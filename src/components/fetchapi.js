import React, { useEffect, useState } from "react";
import axios from "axios";

function Fetchapi(props) {
  const [city, setCity] = useState("Chakwal");
  const [weather, setWeather] = useState("");
  useEffect(() => search(), [])
    const search = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ef277ccf1e865fdb0f6d03ad7ca53bff`;
      const response = await fetch(url);
      const resJson = await response.json();
      setWeather(resJson);
      props.onDetailsClick(weather);
    };
    

  return (
    <div>
      <input
        type="text"
        value={city}
        placeholder="Enter City Name"
        onChange={(e) => setCity(e.target.value)}
      />
<button onClick={()=> search()}>Search</button>
      {!weather?  (<p>No Data</p>): (
      <div>
        <h3>{weather.name}</h3>
        <h4>{(weather.main.temp - 273).toFixed(2) + " °C"} </h4>
      </div> )}
    </div>
  );
}
export default Fetchapi;
