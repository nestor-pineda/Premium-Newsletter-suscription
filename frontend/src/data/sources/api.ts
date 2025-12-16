import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For HTTP-only cookies
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g. 401 Unauthorized)
    if (error.response?.status === 401) {
        // Redirect to login or handle session expiry
    }
    return Promise.reject(error);
  }
);

export default api;

