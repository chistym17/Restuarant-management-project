import axios from 'axios';

const AxiosSecure = axios.create({
  baseURL: 'http://localhost:8000',
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
