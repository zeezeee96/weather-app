import React, { useEffect, useState, useStyles } from "react";
import { searchCities, getTopCities } from "../services/request-service";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';

const Home = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [cities, setCities] = useState([]);
  let history = useHistory();

  const useStyles = makeStyles({
    root: {
      maxWidth: 200,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    getTopCities().then((res) => {
      const topfive = res.slice(0, 5);
      setCities(topfive);
    });
  }, []);

  const search = (newInputValue) => {
    setQuery(newInputValue);
    searchCities(newInputValue).then((data) => setOptions(data));
  };

  return (
    <div>
      <Autocomplete
        id="weather-search"
        onChange={(event, newValue) => {
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

      <div>
        {cities.map((x) => {
          console.log(x);
          return (
            <Card key={x.Key}className={classes.root}>
              <CardActionArea>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {x.EnglishName}
                </Typography>
                <Typography variant="body2" component="p">
                  {x.Temperature.Metric.Value }<sup>&deg;</sup>C
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
