import React, { createContext, useState } from "react";
import api from "../services/api";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [varieties, setVarieties] = useState([]);
  // Add state for other entities

  const fetchVarieties = async () => {
    const data = await api.getVarieties();
    setVarieties(data);
  };

  // Add fetch and CRUD functions for other entities

  return (
    <DataContext.Provider value={{
      varieties, fetchVarieties,
      // other entities and functions
    }}>
      {children}
    </DataContext.Provider>
  );
}