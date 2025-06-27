import axios from 'axios';

const useInstanceForLogin = () => {
  //const navigate = useNavigate();
  const loginInstance = axios.create({
    baseURL: import.meta.env[
      `VITE_${import.meta.env.VITE_ENVIRONMENT}_API_URL`
    ],
  });

  return { loginInstance: loginInstance };
};

export default useInstanceForLogin;
