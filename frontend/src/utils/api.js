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

// Add response interceptor to handle errors globally
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
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
  getCurrentUser: () => api.get('/api/auth/me'),
};

// Doctor API functions
export const doctorAPI = {
  getAllDoctors: () => api.get('/api/doctors'),
  getDoctorById: (id) => api.get(`/api/doctors/${id}`),
  createDoctor: (doctorData) => api.post('/api/doctors', doctorData),
  updateDoctor: (id, doctorData) => api.put(`/api/doctors/${id}`, doctorData),
  deleteDoctor: (id) => api.delete(`/api/doctors/${id}`),
};

// Patient API functions
export const patientAPI = {
  getAllPatients: () => api.get('/api/patients'),
  getPatientById: (id) => api.get(`/api/patients/${id}`),
  createPatient: (patientData) => api.post('/api/patients', patientData),
  updatePatient: (id, patientData) => api.put(`/api/patients/${id}`, patientData),
  deletePatient: (id) => api.delete(`/api/patients/${id}`),
};

// Appointment API functions
export const appointmentAPI = {
  getAllAppointments: () => api.get('/api/appointments'),
  getAppointmentById: (id) => api.get(`/api/appointments/${id}`),
  createAppointment: (appointmentData) => api.post('/api/appointments', appointmentData),
  updateAppointment: (id, appointmentData) => api.put(`/api/appointments/${id}`, appointmentData),
  deleteAppointment: (id) => api.delete(`/api/appointments/${id}`),
  getAppointmentsByDoctor: (doctorId) => api.get(`/api/appointments/doctor/${doctorId}`),
  getAppointmentsByPatient: (patientId) => api.get(`/api/appointments/patient/${patientId}`),
};

// Slots API functions
export const slotAPI = {
  getAllSlots: () => api.get('/api/slots'),
  getSlotById: (id) => api.get(`/api/slots/${id}`),
  createSlot: (slotData) => api.post('/api/slots', slotData),
  updateSlot: (id, slotData) => api.put(`/api/slots/${id}`, slotData),
  deleteSlot: (id) => api.delete(`/api/slots/${id}`),
  getSlotsByDoctor: (doctorId) => api.get(`/api/slots/doctor/${doctorId}`),
  getAvailableSlots: (doctorId, date) => api.get(`/api/slots/available/${doctorId}/${date}`),
};

// Default export
export default api;