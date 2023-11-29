import axios from 'axios';

const url = process.env.REACT_APP_API_URL || 'localhost';

const api = axios.create({
  baseURL: `http://${url}:8080`, 
});

export default api;