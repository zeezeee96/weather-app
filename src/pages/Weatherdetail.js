import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCityDetail } from "../services/request-service";
import { useParams } from "react-router-dom";
const Weatherdetails = () => {
  const [weatherinfo, setWeatherInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id, name } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getCityDetail(id)
      .then((data) => {
        setWeatherInfo(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [id]);

  return (
    <div>
      {isLoading ? (
        "Loader"
      ) : (
        <React.Fragment>
          {weatherinfo.Temperature && (
            <div>
              <h3>{name}</h3>
              <h4>
                {weatherinfo.Temperature.Metric.Value}
                <sup>&deg;</sup>C
              </h4>
              <h5>{weatherinfo.WeatherText}</h5>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};
export default Weatherdetails;
