import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Varieties from "./pages/Varieties";
import Crops from "./pages/Crops";
import Greenhouses from "./pages/Greenhouses";
import Login from "./pages/Login";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Only show Navbar/Sidebar if NOT on login page and user is authenticated
  const showLayout = user && location.pathname !== "/login";

  return (
    <div>
      {showLayout && <Navbar />}
      <div className={showLayout ? "d-flex" : ""} style={showLayout ? { minHeight: "100vh" } : {}}>
        {showLayout && <Sidebar />}
        <div style={showLayout ? { marginLeft: "220px", width: "100%" } : {}}>
          <div className="container-fluid mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
              <Route path="/varieties" element={
                <ProtectedRoute><Varieties /></ProtectedRoute>
              } />
              <Route path="/crops" element={
                <ProtectedRoute><Crops /></ProtectedRoute>
              } />
              <Route path="/greenhouses" element={
                <ProtectedRoute><Greenhouses /></ProtectedRoute>
              } />
              {/* Add more protected routes */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;