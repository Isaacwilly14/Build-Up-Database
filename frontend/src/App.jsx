import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Varieties from "./pages/Varieties";
import Crops from "./pages/Crops";
import Greenhouses from "./pages/Greenhouses";
// import other pages as needed

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Navbar />
          <div className="container-fluid mt-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/varieties" element={<Varieties />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/greenhouses" element={<Greenhouses />} />
              {/* Add routes for other pages */}
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
