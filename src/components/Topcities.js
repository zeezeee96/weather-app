import React, { useEffect, useState } from "react";
import { getTopCities } from "../services/request-service";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';

export const TopCities = () => {
    const [cities, setCities] = useState([]);
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
return (
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
)    
}