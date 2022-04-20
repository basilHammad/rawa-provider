import axios from "axios";
import { getData } from "../utils";

const fetcher = axios.create({
  baseURL: `https://api.publicapis.org/entries`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: 0,
    Accept: "application/json",
  },
});

fetcher.interceptors.request.use(
  async (config) => {
    // config.headers.token = CLIENT_SECRET;
    if (typeof window !== "undefined") {
      const token = getData("token");
      config.headers.Authorization = `Bearer ${token} `;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default fetcher;
