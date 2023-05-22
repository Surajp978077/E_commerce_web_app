import axios from 'axios';

// export default axios.create({
//   baseURL: 'https://localhost:7044/api',
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     'Content-Type': 'application/json'
//   }
// });

export const userInfoInstance = axios.create({
  baseURL: 'https://localhost:7240/api/UserInfo',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productInstance = axios.create({
  baseURL: 'https://localhost:7044/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to set the Authorization header when a token is available
const setAuthHeaderInterceptor = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

userInfoInstance.interceptors.request.use(setAuthHeaderInterceptor);
productInstance.interceptors.request.use(setAuthHeaderInterceptor);