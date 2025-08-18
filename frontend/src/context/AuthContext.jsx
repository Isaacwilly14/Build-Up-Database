import React, { createContext, useState, useEffect } from "react";
import apiService from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Rehydrate from localStorage (if already logged in)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      console.log('AuthContext: Attempting login with:', { username, password });
      const user = await apiService.auth.login(username, password);
      console.log('AuthContext: Login result:', user);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log('AuthContext: Login successful, user set');
        return true;
      }
      console.log('AuthContext: Login failed - no user returned');
      return false;
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    apiService.auth.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}