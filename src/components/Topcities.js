import React, { useEffect, useState } from "react";
import { getTopCities } from "../services/request-service";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constants/constants"

export const TopCities = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getTopCities().then((res) => {
      const topten = res.slice(0, 10);
      console.log(topten)
      setCities(topten);
      setLoading(false);
    });
  }, []);

  const handleCardClick = (LocalizedName, Key) => {
    history.push(`/details/${LocalizedName}/${Key}`);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
    const classes = useStyles();

  return (
    <div>
      {isLoading ? (
         <div className={classes.root}>
         <CircularProgress />
         </div>
      ) : (
    <Grid container spacing={4}>
      {cities.map((x) => {
        return (
          <Grid
            item
            key={x.Key}
            xs={12}
            sm={6}
            md={4}
            onClick={() => handleCardClick(x.LocalizedName, x.Key)}
          >
            <Card>
              <CardActionArea style={{ display: "flex", justifyContent: "space-between"}}>
                <CardContent>
                  <Typography gutterBottom>{x.EnglishName}</Typography>
                  <Typography variant="body2" component="p">
                    {x.Temperature.Metric.Value}
                    <sup>&deg;</sup>C
                  </Typography>
                </CardContent>
                <img
                  src={`${IMAGE_BASE_URL}/${
                    x.WeatherIcon > 9 ? x.WeatherIcon : "0" + x.WeatherIcon
                  }-s.png`}
                  alt={"Icon"}
                />
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
      )}
    </div>
  );
};
