import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const uploadImage = (formData) => API.post('/upload', formData);
export const getTaskStatus = (taskId) => API.get(`/status/${taskId}`);