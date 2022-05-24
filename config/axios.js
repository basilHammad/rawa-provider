import axios from "axios";

import { BASE_URL } from "@env";
import { getData } from "../utils";

const fetcher = axios.create({
  baseURL: "https://acb8-188-247-79-168.ngrok.io/",
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  async (config) => {
    const token = await getData("userToken");
    config.headers.Authorization = `Bearer ${token} `;

    return config;
  },
  (error) => Promise.reject(error)
);

export default fetcher;
