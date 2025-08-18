import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import NotificationToast from "./components/shared/NotificationToast";
import "./styles/custom.css";

function AppContent() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Only show Navbar/Sidebar if NOT on login page and user is authenticated
  const showLayout = user && location.pathname !== "/login";

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="app-container">
      <NotificationToast />
      {showLayout && <Navbar />}
      <div className={showLayout ? "d-flex" : ""} style={showLayout ? { minHeight: "100vh" } : {}}>
        {showLayout && <Sidebar />}
        <div className={showLayout ? "main-content" : "w-100"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className={showLayout ? "container-fluid" : ""}
            >
              <Routes location={location}>
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
            </motion.div>
          </AnimatePresence>
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