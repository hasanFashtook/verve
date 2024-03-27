import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const instanceAxios = axios.create({
  baseURL: `${BASE_URL}`,
});