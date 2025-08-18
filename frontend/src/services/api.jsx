import axios from "axios";

const API_URL = "http://localhost:5000";

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic CRUD operations
const createResource = (resource) => ({
  // Get all items
  getAll: () => api.get(`/${resource}`).then(res => res.data),
  
  // Get single item by id
  getById: (id) => api.get(`/${resource}/${id}`).then(res => res.data),
  
  // Create new item
  create: (data) => api.post(`/${resource}`, data).then(res => res.data),
  
  // Update existing item
  update: (id, data) => api.put(`/${resource}/${id}`, data).then(res => res.data),
  
  // Partially update item
  patch: (id, data) => api.patch(`/${resource}/${id}`, data).then(res => res.data),
  
  // Delete item
  delete: (id) => api.delete(`/${resource}/${id}`).then(res => res.data),
  
  // Search/filter items
  search: (params) => api.get(`/${resource}`, { params }).then(res => res.data),
});

// Authentication
export const auth = {
  login: async (username, password) => {
    try {
      console.log('API Service: Making login request to:', `${API_URL}/users?username=${username}&password=${password}`);
      const res = await api.get(`/users?username=${username}&password=${password}`);
      console.log('API Service: Login response:', res.data);
      if (res.data.length > 0) {
        const user = res.data[0];
        // In a real app, this would come from the server
        const token = btoa(`${username}:${password}:${Date.now()}`);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('API Service: Login successful, user:', user);
        return user;
      }
      console.log('API Service: Login failed - no matching user found');
      return null;
    } catch (error) {
      console.error('API Service: Login error:', error);
      return null;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Resource APIs
export const varieties = createResource('varieties');
export const crops = createResource('crops');
export const greenhouses = createResource('greenhouses');
export const forecast = createResource('forecast');
export const tasks = createResource('tasks');
export const sticking = createResource('sticking');
export const transplanting = createResource('transplanting');
export const missingAT = createResource('missingAT');
export const stickingPlan = createResource('stickingPlan');
export const losses = createResource('losses');
export const seasons = createResource('seasons');
export const layout = createResource('layout');
export const bedLabels = createResource('bedLabels');
export const groupping = createResource('groupping');
export const mapping = createResource('mapping');
export const users = createResource('users');

// Custom API methods for specific business logic
export const customAPI = {
  // Dashboard analytics
  getDashboardStats: async () => {
    try {
      const [varietiesRes, cropsRes, greenhousesRes, tasksRes] = await Promise.all([
        varieties.getAll(),
        crops.getAll(),
        greenhouses.getAll(),
        tasks.getAll()
      ]);
      
      return {
        totalVarieties: varietiesRes.length,
        totalCrops: cropsRes.length,
        totalGreenhouses: greenhousesRes.length,
        totalTasks: tasksRes.length,
        completedTasks: tasksRes.filter(t => t.TaskStatus === 'Completed').length,
        pendingTasks: tasksRes.filter(t => t.TaskStatus === 'Pending').length,
        inProgressTasks: tasksRes.filter(t => t.TaskStatus === 'In Progress').length,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {};
    }
  },
  
  // Get tasks by status
  getTasksByStatus: async (status) => {
    try {
      const allTasks = await tasks.getAll();
      return allTasks.filter(task => task.TaskStatus === status);
    } catch (error) {
      console.error('Error fetching tasks by status:', error);
      return [];
    }
  },
  
  // Get upcoming tasks
  getUpcomingTasks: async (days = 7) => {
    try {
      const allTasks = await tasks.getAll();
      const now = new Date();
      const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
      
      return allTasks.filter(task => {
        if (!task.TaskDate) return false;
        const taskDate = new Date(task.TaskDate);
        return taskDate >= now && taskDate <= futureDate;
      });
    } catch (error) {
      console.error('Error fetching upcoming tasks:', error);
      return [];
    }
  },
  
  // Get overdue tasks
  getOverdueTasks: async () => {
    try {
      const allTasks = await tasks.getAll();
      const now = new Date();
      
      return allTasks.filter(task => {
        if (!task.TaskDate || task.TaskStatus === 'Completed') return false;
        const taskDate = new Date(task.TaskDate);
        return taskDate < now;
      });
    } catch (error) {
      console.error('Error fetching overdue tasks:', error);
      return [];
    }
  },
  
  // Bulk operations
  bulkUpdateTasks: async (taskIds, updates) => {
    try {
      const promises = taskIds.map(id => tasks.patch(id, updates));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk updating tasks:', error);
      throw error;
    }
  },
  
  // Export data
  exportData: async (resource, format = 'json') => {
    try {
      const data = await api.get(`/${resource}`).then(res => res.data);
      
      if (format === 'csv') {
        return convertToCSV(data);
      }
      
      return data;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }
};

// Utility function to convert JSON to CSV
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

// Legacy exports for backward compatibility
export const login = auth.login;
export const getVarieties = varieties.getAll;
export const addVariety = varieties.create;
export const getCrops = crops.getAll;
export const addCrop = crops.create;
export const getGreenhouses = greenhouses.getAll;
export const addGreenhouse = greenhouses.create;
export const getForecast = forecast.getAll;
export const addForecast = forecast.create;
export const getTasks = tasks.getAll;
export const addTask = tasks.create;

export default {
  auth,
  varieties,
  crops,
  greenhouses,
  forecast,
  tasks,
  sticking,
  transplanting,
  missingAT,
  stickingPlan,
  losses,
  seasons,
  layout,
  bedLabels,
  groupping,
  mapping,
  users,
  customAPI,
  api
};