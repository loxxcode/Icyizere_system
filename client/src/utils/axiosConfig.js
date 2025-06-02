import axios from 'axios';

// Configure Axios to use the Railway backend directly
const API_URL = 'https://icyizere-v2-production.up.railway.app';
console.log('API configured to directly use Railway backend:', API_URL);

// Set the base URL for all Axios requests
axios.defaults.baseURL = API_URL;

// Add response interceptor to handle errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;
