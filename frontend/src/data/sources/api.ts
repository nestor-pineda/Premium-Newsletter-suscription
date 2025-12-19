import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For HTTP-only cookies
});

api.interceptors.request.use((config) => {
    // Check if running in browser to avoid SSR issues with localStorage
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g. 401 Unauthorized)
    if (error.response?.status === 401) {
        // Redirect to login or handle session expiry
        // Optional: clear token if 401
        if (typeof window !== 'undefined') {
             // localStorage.removeItem('token'); 
             // Don't auto-remove, might be transient or need refresh, let the app handle it
        }
    }
    return Promise.reject(error);
  }
);

export default api;
