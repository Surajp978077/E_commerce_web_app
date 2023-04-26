import axios from 'axios';

export const userInfoInstance = axios.create({
  baseURL: 'https://localhost:7240/api/UserInfo',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer ' + getToken()
  }
});

export const productInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

function getToken() {
  return localStorage.getItem('token');
}
