import axios from "axios";

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

export default fetcher;
