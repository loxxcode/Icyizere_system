import axios from 'axios';

// Direct API URL (no proxy)
const API_URL = 'https://icyizere-v2-production.up.railway.app';

// Configure Axios
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: false, // Important for CORS
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Adding non-standard headers that might help bypass CORS restrictions
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'  
  }
});

// Log the configuration
console.log('API configured with direct connection to:', API_URL);

// Add a request interceptor to modify each request
instance.interceptors.request.use(function (config) {
  // Add a timestamp parameter to prevent caching issues
  const timestamp = new Date().getTime();
  
  if (config.url.indexOf('?') !== -1) {
    config.url = `${config.url}&_t=${timestamp}`;
  } else {
    config.url = `${config.url}?_t=${timestamp}`;
  }
  
  return config;
});

// Add response interceptor to handle errors
instance.interceptors.response.use(
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

// Export our configured instance instead of the default axios
export default instance;
