'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
    
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user?.jwt as string}`
      }
      return config
    });

    return ()=>{
      axiosAuth.interceptors.request.eject(requestInterceptor);
    };

  }, [session]);
}

export default useAxiosAuth;