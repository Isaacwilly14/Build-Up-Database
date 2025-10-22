import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/crops",
});

const addCrop = (cropData: {
  cropCode: string;
  subGroup: string;
  cropName: string;
  seasonCode: string;
}) => {
  return apiClient.post("/", cropData);
};

export default {
  addCrop,
};
