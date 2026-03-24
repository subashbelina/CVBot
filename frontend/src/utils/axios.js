import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: false,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor (simplified - no auth required)
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.');
      return Promise.reject(error);
    }

    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'An error occurred';
    
    // Handle specific error cases (removed auth-related cases)
    switch (error.response?.status) {
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
      case 404:
        toast.error('The requested resource was not found.');
        break;
      case 422:
        // Handle validation errors
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          Object.values(validationErrors).forEach(err => toast.error(err));
        } else {
          toast.error(errorMessage);
        }
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api; 