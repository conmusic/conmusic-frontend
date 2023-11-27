import axios from 'axios';

const url = process.env.REACT_APP_API_URL || '54.145.89.39';

const api = axios.create({
  baseURL: `http://${url}:8080`, 
});

export default api;