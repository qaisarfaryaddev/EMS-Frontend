import axios from 'axios';

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add an interceptor to attach the token to the headers
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token to Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosApi;
