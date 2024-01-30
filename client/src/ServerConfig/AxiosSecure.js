import axios from 'axios';

const AxiosSecure = axios.create({
  baseURL: 'https://flavourfusion.onrender.com/',
});

AxiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosSecure;
