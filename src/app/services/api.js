import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Remove all auth interceptors for now
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Colleges API (public)
export const collegesAPI = {
  getAll: (params = {}) => api.get('/colleges/', { params }),
  getById: (id) => api.get(`/colleges/${id}/`),
  getFilterOptions: () => api.get('/colleges/filters/'),
};

// Chatbot API (public)
export const chatbotAPI = {
  sendMessage: (message, sessionId = null, state = null, location = null) => {
    const payload = { message, session_id: sessionId };
    if (state) payload.context_state = state;
    if (location) payload.context_location = location;
    return api.post('/chatbot/chat/', payload);
  },
  getSessions: () => api.get('/chatbot/sessions/'),
  getSessionDetail: (sessionId) => api.get(`/chatbot/sessions/${sessionId}/`),
  deleteSession: (sessionId) => api.delete(`/chatbot/sessions/${sessionId}/`),
};

// Auth API (optional - for later)
export const authAPI = {
  register: (userData) => api.post('/users/register/', userData),
  login: (credentials) => api.post('/users/login/', credentials),
  getProfile: () => api.get('/users/profile/'),
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

export default api;