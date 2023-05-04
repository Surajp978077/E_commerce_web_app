import axios from "axios";

export const userInfoInstance = axios.create({
  baseURL: "https://localhost:7240/api/UserInfo",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const vendorInstance = axios.create({
  baseURL: "https://localhost:7044/api",
  timeout: 5000,
});

// Add a request interceptor to set the Authorization header when a token is available
const setAuthHeaderInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

userInfoInstance.interceptors.request.use(setAuthHeaderInterceptor);
vendorInstance.interceptors.request.use(setAuthHeaderInterceptor);
