import { ACCESS_TOKEN } from '@/constants/cookies';
import { getCookie } from '@/helpers/cookie';
import axios from 'axios';

export const axiosWithAccessToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

axiosWithAccessToken.interceptors.request.use(
   async (config) => {
    const accessToken = getCookie(ACCESS_TOKEN);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosWithoutAccessToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
  });
