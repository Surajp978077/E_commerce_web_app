import axios from "axios";

export const userInfoInstance = axios.create({
  baseURL: "https://localhost:7240/api/UserInfo",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + getToken(),
    "Content-Type": "application/json",
  },
});

export const vendorInstance = axios.create({
  baseURL: "https://localhost:7044/api",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

function getToken() {
  return localStorage.getItem("token");
}
