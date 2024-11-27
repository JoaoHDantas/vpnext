import axios from "axios";


const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  withCredentials: true, // Necessário se usar cookies para autenticação
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    console.log('Request Config:', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      window.location.replace('/');
    }
    console.error('Response Error:', error.response);
    return Promise.reject(error);
  }
);

export default API;