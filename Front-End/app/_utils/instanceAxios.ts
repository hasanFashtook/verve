
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_STRAPI_APT;
const backendUrl = process.env.NEXT_PUBLIC_BACK_END_URL;

export const instanceAxios = axios.create({
  baseURL: `https://verve-admin-panel.onrender.com/api/`,
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
});