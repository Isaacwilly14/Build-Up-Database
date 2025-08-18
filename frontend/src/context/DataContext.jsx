import React, { createContext, useReducer, useEffect, useCallback } from "react";
import api, { customAPI } from "../services/api";

export const DataContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_VARIETIES: 'SET_VARIETIES',
  SET_CROPS: 'SET_CROPS',
  SET_GREENHOUSES: 'SET_GREENHOUSES',
  SET_FORECAST: 'SET_FORECAST',
  SET_TASKS: 'SET_TASKS',
  SET_STICKING: 'SET_STICKING',
  SET_TRANSPLANTING: 'SET_TRANSPLANTING',
  SET_MISSING_AT: 'SET_MISSING_AT',
  SET_SEASONS: 'SET_SEASONS',
  SET_LAYOUT: 'SET_LAYOUT',
  SET_GROUPPING: 'SET_GROUPPING',
  SET_MAPPING: 'SET_MAPPING',
  SET_DASHBOARD_STATS: 'SET_DASHBOARD_STATS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION'
};

// Initial state
const initialState = {
  loading: false,
  error: null,
  varieties: [],
  crops: [],
  greenhouses: [],
  forecast: [],
  tasks: [],
  sticking: [],
  transplanting: [],
  missingAT: [],
  seasons: [],
  layout: [],
  groupping: [],
  mapping: [],
  dashboardStats: {},
  notification: null
};

// Reducer function
function dataReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.SET_VARIETIES:
      return { ...state, varieties: action.payload, loading: false };
    
    case ACTIONS.SET_CROPS:
      return { ...state, crops: action.payload, loading: false };
    
    case ACTIONS.SET_GREENHOUSES:
      return { ...state, greenhouses: action.payload, loading: false };
    
    case ACTIONS.SET_FORECAST:
      return { ...state, forecast: action.payload, loading: false };
    
    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, loading: false };
    
    case ACTIONS.SET_STICKING:
      return { ...state, sticking: action.payload, loading: false };
    
    case ACTIONS.SET_TRANSPLANTING:
      return { ...state, transplanting: action.payload, loading: false };
    
    case ACTIONS.SET_MISSING_AT:
      return { ...state, missingAT: action.payload, loading: false };
    
    case ACTIONS.SET_SEASONS:
      return { ...state, seasons: action.payload, loading: false };
    
    case ACTIONS.SET_LAYOUT:
      return { ...state, layout: action.payload, loading: false };
    
    case ACTIONS.SET_GROUPPING:
      return { ...state, groupping: action.payload, loading: false };
    
    case ACTIONS.SET_MAPPING:
      return { ...state, mapping: action.payload, loading: false };
    
    case ACTIONS.SET_DASHBOARD_STATS:
      return { ...state, dashboardStats: action.payload, loading: false };
    
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        [action.payload.type]: [...state[action.payload.type], action.payload.item],
        loading: false
      };
    
    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map(item =>
          item.id === action.payload.item.id ? action.payload.item : item
        ),
        loading: false
      };
    
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(
          item => item.id !== action.payload.id
        ),
        loading: false
      };
    
    case ACTIONS.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    
    case ACTIONS.CLEAR_NOTIFICATION:
      return { ...state, notification: null };
    
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Notification system - memoized
  const showNotification = useCallback((message, type = 'success') => {
    dispatch({
      type: ACTIONS.SET_NOTIFICATION,
      payload: { message, type, timestamp: Date.now() }
    });
    
    // Auto-clear notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_NOTIFICATION });
    }, 5000);
  }, []);

  const clearNotification = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_NOTIFICATION });
  }, []);

  // Error handling wrapper - memoized
  const handleAsync = useCallback(async (asyncFunction, successMessage) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });
      
      const result = await asyncFunction();
      
      if (successMessage) {
        showNotification(successMessage);
      }
      
      return result;
    } catch (error) {
      console.error('Error in async operation:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      showNotification(errorMessage, 'error');
      throw error;
    }
  }, [showNotification]);

  // Fetch functions - memoized to prevent infinite loops
  const fetchVarieties = useCallback(() => handleAsync(async () => {
    const data = await api.varieties.getAll();
    dispatch({ type: ACTIONS.SET_VARIETIES, payload: data });
    return data;
  }), [handleAsync]);

  const fetchCrops = useCallback(() => handleAsync(async () => {
    const data = await api.crops.getAll();
    dispatch({ type: ACTIONS.SET_CROPS, payload: data });
    return data;
  }), [handleAsync]);

  const fetchGreenhouses = useCallback(() => handleAsync(async () => {
    const data = await api.greenhouses.getAll();
    dispatch({ type: ACTIONS.SET_GREENHOUSES, payload: data });
    return data;
  }), [handleAsync]);

  const fetchForecast = useCallback(() => handleAsync(async () => {
    const data = await api.forecast.getAll();
    dispatch({ type: ACTIONS.SET_FORECAST, payload: data });
    return data;
  }), [handleAsync]);

  const fetchTasks = useCallback(() => handleAsync(async () => {
    const data = await api.tasks.getAll();
    dispatch({ type: ACTIONS.SET_TASKS, payload: data });
    return data;
  }), [handleAsync]);

  const fetchSticking = () => handleAsync(async () => {
    const data = await api.sticking.getAll();
    dispatch({ type: ACTIONS.SET_STICKING, payload: data });
    return data;
  });

  const fetchTransplanting = () => handleAsync(async () => {
    const data = await api.transplanting.getAll();
    dispatch({ type: ACTIONS.SET_TRANSPLANTING, payload: data });
    return data;
  });

  const fetchMissingAT = () => handleAsync(async () => {
    const data = await api.missingAT.getAll();
    dispatch({ type: ACTIONS.SET_MISSING_AT, payload: data });
    return data;
  });

  const fetchSeasons = () => handleAsync(async () => {
    const data = await api.seasons.getAll();
    dispatch({ type: ACTIONS.SET_SEASONS, payload: data });
    return data;
  });

  const fetchLayout = () => handleAsync(async () => {
    const data = await api.layout.getAll();
    dispatch({ type: ACTIONS.SET_LAYOUT, payload: data });
    return data;
  });

  const fetchGroupping = () => handleAsync(async () => {
    const data = await api.groupping.getAll();
    dispatch({ type: ACTIONS.SET_GROUPPING, payload: data });
    return data;
  });

  const fetchMapping = () => handleAsync(async () => {
    const data = await api.mapping.getAll();
    dispatch({ type: ACTIONS.SET_MAPPING, payload: data });
    return data;
  });

  const fetchDashboardStats = useCallback(() => handleAsync(async () => {
    const data = await customAPI.getDashboardStats();
    dispatch({ type: ACTIONS.SET_DASHBOARD_STATS, payload: data });
    return data;
  }), [handleAsync]);

  // CRUD operations
  const createVariety = (variety) => handleAsync(async () => {
    const newVariety = await api.varieties.create(variety);
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { type: 'varieties', item: newVariety } });
    return newVariety;
  }, 'Variety created successfully');

  const updateVariety = (id, variety) => handleAsync(async () => {
    const updatedVariety = await api.varieties.update(id, variety);
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { type: 'varieties', item: updatedVariety } });
    return updatedVariety;
  }, 'Variety updated successfully');

  const deleteVariety = (id) => handleAsync(async () => {
    await api.varieties.delete(id);
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { type: 'varieties', id } });
  }, 'Variety deleted successfully');

  const createCrop = (crop) => handleAsync(async () => {
    const newCrop = await api.crops.create(crop);
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { type: 'crops', item: newCrop } });
    return newCrop;
  }, 'Crop created successfully');

  const updateCrop = (id, crop) => handleAsync(async () => {
    const updatedCrop = await api.crops.update(id, crop);
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { type: 'crops', item: updatedCrop } });
    return updatedCrop;
  }, 'Crop updated successfully');

  const deleteCrop = (id) => handleAsync(async () => {
    await api.crops.delete(id);
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { type: 'crops', id } });
  }, 'Crop deleted successfully');

  const createGreenhouse = (greenhouse) => handleAsync(async () => {
    const newGreenhouse = await api.greenhouses.create(greenhouse);
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { type: 'greenhouses', item: newGreenhouse } });
    return newGreenhouse;
  }, 'Greenhouse created successfully');

  const updateGreenhouse = (id, greenhouse) => handleAsync(async () => {
    const updatedGreenhouse = await api.greenhouses.update(id, greenhouse);
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { type: 'greenhouses', item: updatedGreenhouse } });
    return updatedGreenhouse;
  }, 'Greenhouse updated successfully');

  const deleteGreenhouse = (id) => handleAsync(async () => {
    await api.greenhouses.delete(id);
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { type: 'greenhouses', id } });
  }, 'Greenhouse deleted successfully');

  const createTask = (task) => handleAsync(async () => {
    const newTask = await api.tasks.create(task);
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { type: 'tasks', item: newTask } });
    return newTask;
  }, 'Task created successfully');

  const updateTask = (id, task) => handleAsync(async () => {
    const updatedTask = await api.tasks.update(id, task);
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { type: 'tasks', item: updatedTask } });
    return updatedTask;
  }, 'Task updated successfully');

  const deleteTask = (id) => handleAsync(async () => {
    await api.tasks.delete(id);
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { type: 'tasks', id } });
  }, 'Task deleted successfully');

  // Bulk operations
  const bulkUpdateTasks = (taskIds, updates) => handleAsync(async () => {
    const updatedTasks = await customAPI.bulkUpdateTasks(taskIds, updates);
    // Refresh tasks data
    await fetchTasks();
    return updatedTasks;
  }, `${taskIds.length} tasks updated successfully`);

  // Search and filter
  const searchData = async (resource, searchTerm) => {
    try {
      const data = await api[resource].search({ q: searchTerm });
      return data;
    } catch (error) {
      console.error(`Error searching ${resource}:`, error);
      return [];
    }
  };

  // Export functionality
  const exportData = (resource, format = 'json') => handleAsync(async () => {
    const data = await customAPI.exportData(resource, format);
    
    // Create download
    const blob = new Blob([format === 'csv' ? data : JSON.stringify(data, null, 2)], {
      type: format === 'csv' ? 'text/csv' : 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource}_export_${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return data;
  }, `${resource} data exported successfully`);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          fetchVarieties(),
          fetchCrops(),
          fetchGreenhouses(),
          fetchTasks(),
          fetchDashboardStats()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, [fetchVarieties, fetchCrops, fetchGreenhouses, fetchTasks, fetchDashboardStats]);

  const contextValue = {
    // State
    ...state,
    
    // Fetch functions
    fetchVarieties,
    fetchCrops,
    fetchGreenhouses,
    fetchForecast,
    fetchTasks,
    fetchSticking,
    fetchTransplanting,
    fetchMissingAT,
    fetchSeasons,
    fetchLayout,
    fetchGroupping,
    fetchMapping,
    fetchDashboardStats,
    
    // CRUD operations
    createVariety,
    updateVariety,
    deleteVariety,
    createCrop,
    updateCrop,
    deleteCrop,
    createGreenhouse,
    updateGreenhouse,
    deleteGreenhouse,
    createTask,
    updateTask,
    deleteTask,
    
    // Bulk operations
    bulkUpdateTasks,
    
    // Utility functions
    searchData,
    exportData,
    showNotification,
    clearNotification,
    
    // API reference
    api
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}
