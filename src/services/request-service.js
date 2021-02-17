import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL,API_AUTOCOMPLETE_URL, API_KEY } from "../constants/constants";

export const fetchApi = async (query) => {
  const { data } = await axios.get(API_BASE_URL+API_AUTOCOMPLETE_URL, {
    params: {
      q: query,
      apikey: API_KEY,
    },
  });
  return data;
};

