import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:7044/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
});