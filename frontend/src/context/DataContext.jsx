import React, { createContext, useState } from "react";
import api from "../services/api";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [varieties, setVarieties] = useState([]);
  const [crops, setCrops] = useState([]);
  // Add state for other entities

  const fetchVarieties = async () => {
    const data = await api.getVarieties();
    setVarieties(data);
  };

  const fetchCrops = async () => {
    const data = await api.getCrops();
    setCrops(data);
  };

  // Add fetch and CRUD functions for other entities

  return (
    <DataContext.Provider value={{
      varieties, fetchVarieties,
      crops, fetchCrops,
    }}>
      {children}
    </DataContext.Provider>
  );
}
