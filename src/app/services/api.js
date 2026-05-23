import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle token refresh and error responses
api.interceptors.response.use(
  (response) => {
    // Return successful response as is
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          localStorage.clear();
          window.location.href = '/';
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const response = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
          refresh: refreshToken,
        });
        
        if (response.data.access) {
          // Save new access token
          localStorage.setItem('access_token', response.data.access);
          
          // Update authorization header and retry original request
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear storage and redirect to login
        console.error('Token refresh failed:', refreshError);
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    // Return error for other status codes (400, 403, 404, 500, etc.)
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/users/register/', userData),
  
  // Login user
  login: (credentials) => api.post('/users/login/', credentials),
  
  // Get user profile
  getProfile: () => api.get('/users/profile/'),
  
  // Update user profile
  updateProfile: (userData) => api.put('/users/profile/', userData),
  
  // Refresh token
  refreshToken: (refresh) => api.post('/users/token/refresh/', { refresh }),
  
  // Logout (clear local storage)
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  },
};

// Colleges API endpoints (for future use)
export const collegesAPI = {
  getAll: () => api.get('/colleges/'),
  getById: (id) => api.get(`/colleges/${id}/`),
  search: (params) => api.get('/colleges/search/', { params }),
};

// Chatbot API endpoints (for future use)
export const chatbotAPI = {
  sendMessage: (message) => api.post('/chatbot/message/', { message }),
  getHistory: () => api.get('/chatbot/history/'),
};

export default api;