import React, { useEffect, useState } from "react";
import { searchCities, getLocation } from "../services/request-service";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Icon } from "@iconify/react";
import mapMarker from "@iconify-icons/fa/map-marker";
export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [geoLocationInfo, setGeoLocationInfo] = useState([])
  const history = useHistory();
  useEffect(() => {
    console.log(latitude, longitude);
    getLocation(latitude, longitude).then((data) => setGeoLocationInfo(data));
  }, [longitude]);
  const search = (newInputValue) => {
    setQuery(newInputValue);
    searchCities(newInputValue).then((data) => setOptions(data));
  };

  const handleOptionSelection = ({ Key, LocalizedName }) => {
    history.push(`/details/${LocalizedName}/${Key}`);
  };
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(getposition);
    function getposition(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      setlatitude(position.coords.latitude);
      setlongitude(position.coords.longitude);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <h1>Zee Zee's Weather Forecast</h1>
        <div style={{display:"flex", width:"100%"}}>
          <Autocomplete
            id="weather-search"
            style={{ width: "100%" }}
            onChange={(event, newValue) => handleOptionSelection(newValue)}
            inputValue={query}
            onInputChange={(event, newInputValue) => search(newInputValue)}
            options={options || []}
            getOptionLabel={(option) => option.LocalizedName}
            renderOption={(option) => (
              <React.Fragment>
                {option.LocalizedName} ({option.Country.LocalizedName})
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Search City Name" />
            )}
          />
          <div
          style={{padding:"25px"}}
            onClick={() => {
              getGeoLocation();
            }}
          >
            <Icon icon={mapMarker} />
          </div>
        </div>
        {geoLocationInfo.Key &&  (<p>Did you mean  
          <button style={{border:"none", color:"blue", fontSize:"16px", textDecoration:"underline"}}
            onClick={()=> {history.push(`/details/${geoLocationInfo.LocalizedName}/${geoLocationInfo.Key}`)
            setGeoLocationInfo([])
            setlongitude("")
            }}>
              {geoLocationInfo.LocalizedName}
              </button>  ? Or Search City Name Manually
           </p>)}
      </div>
    </div>
  );
};
