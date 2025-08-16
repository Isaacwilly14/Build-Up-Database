import axios from "axios";
const API_URL = "http://localhost:3000";

// Generic helpers
const getAll = (resource) => axios.get(`${API_URL}/${resource}`).then(res => res.data);
const addOne = (resource, data) => axios.post(`${API_URL}/${resource}`, data).then(res => res.data);

// Users
export const getUsers = () => getAll("users");
export const addUser = (user) => addOne("users", user);

// Varieties
export const getVarieties = () => getAll("varieties");
export const addVariety = (variety) => addOne("varieties", variety);

// Crops
export const getCrops = () => getAll("crops");
export const addCrop = (crop) => addOne("crops", crop);

// Greenhouses
export const getGreenhouses = () => getAll("greenhouses");
export const addGreenhouse = (greenhouse) => addOne("greenhouses", greenhouse);

// Forecast
export const getForecast = () => getAll("forecast");
export const addForecast = (forecast) => addOne("forecast", forecast);

// Tasks
export const getTasks = () => getAll("tasks");
export const addTask = (task) => addOne("tasks", task);

// Sticking
export const getSticking = () => getAll("sticking");
export const addSticking = (sticking) => addOne("sticking", sticking);

// Transplanting
export const getTransplanting = () => getAll("transplanting");
export const addTransplanting = (transplanting) => addOne("transplanting", transplanting);

// MissingAT
export const getMissingAT = () => getAll("missingAT");
export const addMissingAT = (missingAT) => addOne("missingAT", missingAT);

// StickingPlan
export const getStickingPlan = () => getAll("stickingPlan");
export const addStickingPlan = (plan) => addOne("stickingPlan", plan);

// Losses
export const getLosses = () => getAll("losses");
export const addLoss = (loss) => addOne("losses", loss);

// Seasons
export const getSeasons = () => getAll("seasons");
export const addSeason = (season) => addOne("seasons", season);

// Layout
export const getLayout = () => getAll("layout");
export const addLayout = (layout) => addOne("layout", layout);

// BedLabels
export const getBedLabels = () => getAll("bedLabels");
export const addBedLabel = (bedLabel) => addOne("bedLabels", bedLabel);

// Groupping
export const getGroupping = () => getAll("groupping");
export const addGroupping = (group) => addOne("groupping", group);

// Mapping
export const getMapping = () => getAll("mapping");
export const addMapping = (mapping) => addOne("mapping", mapping);

export default {
  getUsers, addUser,
  getVarieties, addVariety,
  getCrops, addCrop,
  getGreenhouses, addGreenhouse,
  getForecast, addForecast,
  getTasks, addTask,
  getSticking, addSticking,
  getTransplanting, addTransplanting,
  getMissingAT, addMissingAT,
  getStickingPlan, addStickingPlan,
  getLosses, addLoss,
  getSeasons, addSeason,
  getLayout, addLayout,
  getBedLabels, addBedLabel,
  getGroupping, addGroupping,
  getMapping, addMapping
};