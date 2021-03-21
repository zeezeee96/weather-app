import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  API_BASE_URL,
  API_AUTOCOMPLETE_URL,
  API_KEY,
  API_TOPCITIES_URL,
  API_CITYSEARCH_URL,
  API_GEOLOCATION_URL,
} from "../constants/constants";

export const searchCities = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_BASE_URL + API_AUTOCOMPLETE_URL, {
        params: {
          q: query,
          apikey: API_KEY,
        },
      })
      .then((response) => resolve(response.data));
  });
};
export const getTopCities = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_BASE_URL + API_TOPCITIES_URL, {
        params: {
          apikey: API_KEY,
        },
      })
      .then((response) => resolve(response.data));
  });
};
export const getCityDetail = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_BASE_URL + API_CITYSEARCH_URL + id, {
        params: {
          apikey: API_KEY,
          details: true,
        },
      })
      .then((response) => resolve(response.data[0]));
  });
};
export const getLocation = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_BASE_URL + API_GEOLOCATION_URL + API_KEY, {
        params: {
          q: `${latitude},${longitude}`,
          toplevel: true,
        },
      })
      .then((response) => resolve(response.data));
  });
};
