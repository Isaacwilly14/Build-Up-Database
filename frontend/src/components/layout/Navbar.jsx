import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { Bell, User, LogOut, Settings } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <BsNavbar className="modern-navbar" variant="light" expand="lg" fixed="top">
      <Container fluid>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <i className="bi bi-graph-up me-2 fs-3"></i>
            Build UP ERP
          </BsNavbar.Brand>
        </motion.div>
        
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Nav.Link as={Link} to="/varieties">
                <i className="bi bi-flower1 me-2"></i>Varieties
              </Nav.Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Nav.Link as={Link} to="/crops">
                <i className="bi bi-tree me-2"></i>Crops
              </Nav.Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Nav.Link as={Link} to="/greenhouses">
                <i className="bi bi-house me-2"></i>Greenhouses
              </Nav.Link>
            </motion.div>
          </Nav>
          
          <Nav className="align-items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="d-flex align-items-center"
            >
              <Button variant="outline-primary" size="sm" className="me-3 rounded-pill">
                <Bell size={16} />
              </Button>
              
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="outline-primary" 
                  className="rounded-pill d-flex align-items-center"
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <User size={16} className="me-2" />
                  {user?.name || 'User'}
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3">
                  <Dropdown.Item>
                    <Settings size={16} className="me-2" />
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <LogOut size={16} className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </motion.div>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;