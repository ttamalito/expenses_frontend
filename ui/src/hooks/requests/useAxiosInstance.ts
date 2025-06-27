import axios, { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { routes } from '../../routes/routes.ts';
import { useAuth } from '../useAuth.tsx';
const useAxiosInstance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  const instance = axios.create({
    baseURL: import.meta.env[
      `VITE_${import.meta.env.VITE_ENVIRONMENT}_API_URL`
    ],
  });

  instance.interceptors.request.use(
    (config) => {
      // set the bearer token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        navigate(routes.home.login, { state: { from: location.pathname } });
      }
      // if (error.response?.status === 500) {
      //   navigate(routes.error, { state: { from: location.pathname } });
      // }
      return Promise.reject(error);
    },
  );

  return { instance };
};

export default useAxiosInstance;
