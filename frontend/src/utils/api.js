import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:8000'; // Adjust this to match your backend port

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  getCurrentUser: () => api.get('/auth/me'),
};

// Doctor API functions
export const doctorAPI = {
  getAllDoctors: () => api.get('/doctors'),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
  updateDoctor: (id, data) => api.put(`/doctors/${id}`, data),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
  registerDoctor: (data) => api.post('/doctors/register', data),
  loginDoctor: (credentials) => api.post('/doctors/login', credentials),
};

// Patient API functions
export const patientAPI = {
  getAllPatients: () => api.get('/patients'),
  getPatientById: (id) => api.get(`/patients/${id}`),
  updatePatient: (id, data) => api.put(`/patients/${id}`, data),
  deletePatient: (id) => api.delete(`/patients/${id}`),
  registerPatient: (data) => api.post('/patients/register', data),
  loginPatient: (credentials) => api.post('/patients/login', credentials),
};

// Slot API functions
export const slotAPI = {
  getAllSlots: () => api.get('/slots'),
  getSlotsByDoctor: (doctorId) => api.get(`/slots/doctor/${doctorId}`),
  createSlot: (data) => api.post('/slots', data),
  updateSlot: (id, data) => api.put(`/slots/${id}`, data),
  deleteSlot: (id) => api.delete(`/slots/${id}`),
  bookSlot: (slotId, patientData) => api.post(`/slots/${slotId}/book`, patientData),
};

// Appointment API functions
export const appointmentAPI = {
  getAllAppointments: () => api.get('/appointments'),
  getAppointmentsByPatient: (patientId) => api.get(`/appointments/patient/${patientId}`),
  getAppointmentsByDoctor: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  createAppointment: (data) => api.post('/appointments', data),
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data),
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
};

// Export the main api instance as default
export default api;
