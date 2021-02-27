import React, { useState, useEffect } from "react";
import { getCityDetail } from "../services/request-service";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constants/constants"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Weatherdetails = () => {
  const [weatherinfo, setWeatherInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id, name } = useParams();

  useEffect(() => {
    setLoading(true);
    getCityDetail(id)
      .then((data) => {
        setWeatherInfo(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [id]);

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
        <React.Fragment>
          {weatherinfo.Temperature && (
            <div>
              <Card>
                <CardContent style={{ display: "flex", justifyContent: "space-between"}}>
                  <Typography component="h1">
                    <h3>{name}</h3>
                    </Typography>
                  <Typography variant="body2" component="h1">
                    <h4>Current Temperature: {weatherinfo.Temperature.Metric.Value}
                    <sup>&deg;</sup>C</h4>
                  </Typography>
                  
                <img
                  src={`${IMAGE_BASE_URL}/${
                    weatherinfo.WeatherIcon > 9 ? weatherinfo.WeatherIcon : "0" + weatherinfo.WeatherIcon
                  }-s.png`}
                  alt={"Icon"}
                />
                  </CardContent> 
                
                <Typography >
                  RealFeel Temperature:
                  {weatherinfo.RealFeelTemperature.Metric.Value}<sup>&deg;</sup>C
                  </Typography>
                  <Typography >
                  Relative Humidity:
                  {weatherinfo.RelativeHumidity}%
                  </Typography>
                  <Typography >
                  Pressure:
                  {weatherinfo.Pressure.Metric.Value} {weatherinfo.Pressure.Metric.Unit}
                  </Typography>
                  <Typography>
                  {weatherinfo.WeatherText}
                  </Typography>
                  <Typography>
                  CloudCover:
                  {weatherinfo.CloudCover}%
                  </Typography>
                   
            </Card>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};
export default Weatherdetails;
