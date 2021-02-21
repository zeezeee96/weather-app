import React, { useState } from "react";
import { searchCities } from "../services/request-service";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const history = useHistory();

  const search = (newInputValue) => {
    setQuery(newInputValue);
    searchCities(newInputValue).then((data) => setOptions(data));
  };

  const handleOptionSelection = ({ Key, LocalizedName }) => {
    history.push(`/details/${LocalizedName}/${Key}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 50
      }}
    >
      <h1>Zee Zee's Weather Forecast</h1>
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
    </div>
  );
};
