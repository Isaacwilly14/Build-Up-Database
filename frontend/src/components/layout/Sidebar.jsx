import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", name: "Dashboard", icon: "bi bi-house-fill" },
  { path: "/varieties", name: "Varieties", icon: "bi bi-leaf-fill" },
  { path: "/crops", name: "Crops", icon: "bi bi-flower1" },
  { path: "/greenhouses", name: "Greenhouses", icon: "bi bi-building" },
  { path: "/forecast", name: "Forecasts", icon: "bi bi-calendar-range-fill" },
  { path: "/tasks", name: "Tasks", icon: "bi bi-list-task" },
  { path: "/sticking", name: "Sticking", icon: "bi bi-pin-angle-fill" },
  { path: "/transplanting", name: "Transplanting", icon: "bi bi-arrow-left-right" },
  { path: "/missingAT", name: "MissingAT", icon: "bi bi-exclamation-triangle-fill" },
  { path: "/seasons", name: "Seasons", icon: "bi bi-brightness-high-fill" },
  { path: "/layout", name: "Layout", icon: "bi bi-grid" },
  { path: "/groupping", name: "Groupping", icon: "bi bi-diagram-3-fill" },
  { path: "/mapping", name: "Mapping", icon: "bi bi-map-fill" }
];

function Sidebar() {
  const location = useLocation();

  return (
    <Nav className="flex-column pt-3 bg-light sidebar" style={{ minHeight: "100vh", width: "220px", position: "fixed", left: 0, top: 0, borderRight: "1px solid #eee" }}>
      {navItems.map((item) => (
        <Nav.Link
          key={item.path}
          as={Link}
          to={item.path}
          className={`d-flex align-items-center mb-2 ${location.pathname === item.path ? 'active' : ''}`}
          style={{ fontWeight: location.pathname === item.path ? "bold" : "normal" }}
        >
          <i className={`${item.icon} me-2`} />
          {item.name}
        </Nav.Link>
      ))}
    </Nav>
  );
}

export default Sidebar;