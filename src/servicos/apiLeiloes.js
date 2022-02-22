import axios from 'axios';

// Use seu IP local
const instance = axios.create({
  baseURL: 'http://192.168.1.6:3000/',
  timeout: 1000,
});

export default instance;
