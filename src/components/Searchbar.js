import React, { useState } from "react";
import { searchCities } from "../services/request-service";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  let history = useHistory();
  const search = (newInputValue) => {
    setQuery(newInputValue);
    searchCities(newInputValue).then((data) => setOptions(data));
  };
  return (
    <div>
      <Autocomplete
        id="weather-search"
        onChange={(event, newValue) => {
          console.log(newValue)
          let id = newValue.Key
          let name= newValue.LocalizedName
          history.push(`/details/${name}/${id}`);
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
