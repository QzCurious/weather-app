import axios from "axios";
import { baseURL } from "./constants";

const request = axios.create({
  baseURL,
  params: { appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY },
});

export { request };
