// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.eccomerce.digitaltek.co.in/api/',  // Replace with your API URL
});
const handleSignOut = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/signin/'
};



// Request interceptor to include the access token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refreshing and logging out on token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized) and the original request was to refresh the token, log the user out
    if (error.response.status === 401 && originalRequest.url.includes('token/refresh')) {
      // Perform logout or redirect to login page
      console.log('Logout or redirect to login page');
      handleSignOut()
      
      return Promise.reject(error);
    }

    // If the error status is 401 and the original request was not to refresh the token, try refreshing the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post('token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });

        // Update tokens in localStorage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, perform logout or redirect to login page
        console.log('Logout or redirect to login page');
        handleSignOut()
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
