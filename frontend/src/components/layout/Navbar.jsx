import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";

function Navbar() {
  return (
    <BsNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">SupplyChainApp</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/varieties">Varieties</Nav.Link>
            <Nav.Link as={Link} to="/crops">Crops</Nav.Link>
            <Nav.Link as={Link} to="/greenhouses">Greenhouses</Nav.Link>
            {/* Add links to other modules */}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;