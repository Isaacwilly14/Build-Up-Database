import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Card, Row, Col, Badge, InputGroup, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Download, Upload } from "lucide-react";
import { DataContext } from "../context/DataContext";
import VarietiesTable from "../components/tables/VarietiesTable";
import VarietyForm from "../components/forms/VarietyForm";

function Varieties() {
  const { varieties, fetchVarieties } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVarieties, setFilteredVarieties] = useState([]);

  useEffect(() => {
    fetchVarieties();
  }, [fetchVarieties]);

  useEffect(() => {
    if (varieties) {
      const filtered = varieties.filter(variety =>
        variety.VarietyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variety.VarietyCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variety.Species?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVarieties(filtered);
    }
  }, [varieties, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stats = varieties ? {
    total: varieties.length,
    active: varieties.filter(v => v.Status === 'Active').length,
    species: [...new Set(varieties.map(v => v.Species))].length
  } : { total: 0, active: 0, species: 0 };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-6 fw-bold text-primary mb-2">Varieties Management</h1>
            <p className="text-muted">Manage your plant varieties and species catalog</p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" className="btn-modern">
              <Upload size={16} className="me-2" />
              Import
            </Button>
            <Button variant="outline-primary" className="btn-modern">
              <Download size={16} className="me-2" />
              Export
            </Button>
            <Button 
              variant="primary" 
              className="btn-modern"
              onClick={() => setShowModal(true)}
            >
              <Plus size={16} className="me-2" />
              Add Variety
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <motion.div variants={itemVariants}>
              <Card className="stat-card gradient-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="stat-number">{stats.total}</div>
                      <div className="stat-label text-white">Total Varieties</div>
                    </div>
                    <i className="bi bi-flower1 text-white opacity-75" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4} className="mb-3">
            <motion.div variants={itemVariants}>
              <Card className="stat-card gradient-card success">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="stat-number">{stats.active}</div>
                      <div className="stat-label text-white">Active Varieties</div>
                    </div>
                    <i className="bi bi-check-circle text-white opacity-75" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4} className="mb-3">
            <motion.div variants={itemVariants}>
              <Card className="stat-card gradient-card warning">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="stat-number">{stats.species}</div>
                      <div className="stat-label text-white">Species Types</div>
                    </div>
                    <i className="bi bi-diagram-3 text-white opacity-75" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div variants={itemVariants} className="mb-4">
        <Card className="modern-card">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <InputGroup className="search-container">
                  <Form.Control
                    placeholder="Search varieties by name, code, or species..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input border-0"
                  />
                  <InputGroup.Text className="bg-transparent border-0">
                    <Search size={18} className="text-muted" />
                  </InputGroup.Text>
                </InputGroup>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="outline-primary" size="sm" className="me-2 rounded-pill">
                  <Filter size={16} className="me-1" />
                  Filters
                </Button>
                <Badge bg="light" text="dark" className="modern-badge">
                  {filteredVarieties.length} Results
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Varieties Table */}
      <motion.div variants={itemVariants}>
        <Card className="modern-card">
          <Card.Body>
            <VarietiesTable varieties={filteredVarieties} />
          </Card.Body>
        </Card>
      </motion.div>

      {/* Add Variety Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold">
                  <Plus size={24} className="me-2 text-primary" />
                  Add New Variety
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="pt-0">
                <VarietyForm 
                  onSuccess={() => {
                    setShowModal(false); 
                    fetchVarieties();
                  }} 
                />
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Varieties;