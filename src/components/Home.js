import React, { useEffect, useState } from "react";
import { fetchApi } from "../services/request-service";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Home = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [options, setOptions] = useState([]);

  let history = useHistory();

  const search = (newInputValue) => {
    setQuery(newInputValue);
    fetchApi(newInputValue).then((data) => setOptions(data));
  };

  return (
    <div>
      <Autocomplete
        id="weather-search"
        value={city}
        onChange={(event, newValue) => {
          setCity(newValue);
          sessionStorage.setItem("cityname", JSON.stringify(newValue));
          history.push("/weatherdetails");
        }}
        inputValue={query}
        onInputChange={(event, newInputValue) => search(newInputValue)}
        options={options}
        getOptionLabel={(option) => option.LocalizedName}
        renderOption={(option) => (
          <React.Fragment>
            {option.LocalizedName} ({option.Country.LocalizedName})
          </React.Fragment>
        )}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search City Name" variant="outlined" />
        )}
      />
    </div>
  );
};
export default Home;
