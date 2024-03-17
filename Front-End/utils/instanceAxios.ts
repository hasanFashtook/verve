import { backendUrl } from "@/constants";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_STRAPI_APT;


export const instanceAxios = axios.create({
  baseURL: `${backendUrl}/api/`,
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
});