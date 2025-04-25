import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getTasks = () => axios.get(`${API_BASE_URL}/tasks`);

export const createTask = (taskData) =>
  axios.post(`${API_BASE_URL}/tasks`, taskData);

export const updateTask = (id, taskData) =>
  axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);

export const deleteTask = (id) =>
  axios.delete(`${API_BASE_URL}/tasks/${id}`);