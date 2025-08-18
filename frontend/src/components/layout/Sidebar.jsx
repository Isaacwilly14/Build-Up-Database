import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  Flower, 
  TreePine, 
  Building, 
  Calendar, 
  CheckSquare, 
  Pin, 
  ArrowLeftRight, 
  AlertTriangle, 
  Sun, 
  Grid3X3, 
  Layers, 
  Map 
} from "lucide-react";

const navItems = [
  { path: "/", name: "Dashboard", icon: Home },
  { path: "/varieties", name: "Varieties", icon: Flower },
  { path: "/crops", name: "Crops", icon: TreePine },
  { path: "/greenhouses", name: "Greenhouses", icon: Building },
  { path: "/forecast", name: "Forecasts", icon: Calendar },
  { path: "/tasks", name: "Tasks", icon: CheckSquare },
  { path: "/sticking", name: "Sticking", icon: Pin },
  { path: "/transplanting", name: "Transplanting", icon: ArrowLeftRight },
  { path: "/missingAT", name: "Missing AT", icon: AlertTriangle },
  { path: "/seasons", name: "Seasons", icon: Sun },
  { path: "/layout", name: "Layout", icon: Grid3X3 },
  { path: "/groupping", name: "Grouping", icon: Layers },
  { path: "/mapping", name: "Mapping", icon: Map }
];

const sidebarVariants = {
  hidden: { x: -260 },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

function Sidebar() {
  const location = useLocation();

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="sidebar"
    >
      <div className="sidebar-brand">
        <i className="bi bi-graph-up me-2"></i>
        Build UP ERP
      </div>
      
      <Nav className="flex-column">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              variants={itemVariants}
              custom={index}
            >
              <Nav.Link
                as={Link}
                to={item.path}
                className={`d-flex align-items-center ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={18} className="me-3" />
                {item.name}
              </Nav.Link>
            </motion.div>
          );
        })}
      </Nav>
      
      <div className="mt-auto p-4">
        <div className="text-center text-muted small">
          <div className="mb-2">Version 2.0.0</div>
          <div>&copy; 2025 Build UP ERP</div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;