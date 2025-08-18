import React, { useState, useContext } from "react";
import { Table, Button, Badge, Modal, Form, ButtonGroup, Dropdown } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Eye, MoreVertical, Download, Filter } from "lucide-react";
import { DataContext } from "../../context/DataContext";

function VarietiesTable({ varieties }) {
  const { updateVariety, deleteVariety, showNotification } = useContext(DataContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState([]);

  const handleEdit = (variety) => {
    setSelectedVariety(variety);
    setEditForm({ ...variety });
    setShowEditModal(true);
  };

  const handleDelete = (variety) => {
    setSelectedVariety(variety);
    setShowDeleteModal(true);
  };

  const handleEditSave = async () => {
    try {
      await updateVariety(selectedVariety.id, editForm);
      setShowEditModal(false);
      setSelectedVariety(null);
      setEditForm({});
    } catch (error) {
      showNotification('Failed to update variety', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVariety(selectedVariety.id);
      setShowDeleteModal(false);
      setSelectedVariety(null);
    } catch (error) {
      showNotification('Failed to delete variety', 'error');
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectItem = (varietyId) => {
    setSelectedItems(prev => 
      prev.includes(varietyId) 
        ? prev.filter(id => id !== varietyId)
        : [...prev, varietyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === varieties.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(varieties.map(v => v.id || v.VarietyCode));
    }
  };

  const sortedVarieties = React.useMemo(() => {
    if (!sortConfig.key) return varieties;
    
    return [...varieties].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [varieties, sortConfig]);

  const getStatusBadge = (status) => {
    const badgeProps = {
      'Active': { bg: 'success', text: 'Active' },
      'Inactive': { bg: 'danger', text: 'Inactive' },
      'Pending': { bg: 'warning', text: 'Pending' }
    };
    
    const props = badgeProps[status] || { bg: 'secondary', text: status || 'Unknown' };
    return <Badge bg={props.bg} className="modern-badge">{props.text}</Badge>;
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  if (!varieties || varieties.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted">
          <i className="bi bi-inbox fs-1 d-block mb-3"></i>
          <h5>No varieties found</h5>
          <p>Start by adding your first variety to the system.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Table Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <Form.Check
            type="checkbox"
            checked={selectedItems.length === varieties.length}
            onChange={handleSelectAll}
            indeterminate={selectedItems.length > 0 && selectedItems.length < varieties.length}
          />
          {selectedItems.length > 0 && (
            <span className="text-muted small">
              {selectedItems.length} selected
            </span>
          )}
        </div>
        
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" className="rounded-pill">
            <Filter size={16} className="me-1" />
            Filter
          </Button>
          <Button variant="outline-primary" size="sm" className="rounded-pill">
            <Download size={16} className="me-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="table-responsive">
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          <Table className="modern-table mb-0">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>
                  <Form.Check
                    type="checkbox"
                    checked={selectedItems.length === varieties.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th 
                  className="sortable" 
                  onClick={() => handleSort('VarietyCode')}
                  style={{ cursor: 'pointer' }}
                >
                  Variety Code {getSortIcon('VarietyCode')}
                </th>
                <th 
                  className="sortable" 
                  onClick={() => handleSort('VarietyName')}
                  style={{ cursor: 'pointer' }}
                >
                  Variety Name {getSortIcon('VarietyName')}
                </th>
                <th 
                  className="sortable" 
                  onClick={() => handleSort('CropCode')}
                  style={{ cursor: 'pointer' }}
                >
                  Crop Code {getSortIcon('CropCode')}
                </th>
                <th>Species</th>
                <th>Season</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ width: '150px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedVarieties.map((variety, index) => (
                  <motion.tr
                    key={variety.id || variety.VarietyCode}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                  >
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(variety.id || variety.VarietyCode)}
                        onChange={() => handleSelectItem(variety.id || variety.VarietyCode)}
                      />
                    </td>
                    <td>
                      <strong className="text-primary">{variety.VarietyCode}</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="variety-avatar me-2">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ 
                              width: 32, 
                              height: 32, 
                              background: `hsl(${(variety.VarietyName?.charCodeAt(0) || 0) * 137.5 % 360}, 70%, 60%)` 
                            }}
                          >
                            {variety.VarietyName?.charAt(0) || 'V'}
                          </div>
                        </div>
                        <div>
                          <div className="fw-semibold">{variety.VarietyName}</div>
                          {variety.Description && (
                            <small className="text-muted">{variety.Description}</small>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg="light" text="dark" className="modern-badge">
                        {variety.CropCode}
                      </Badge>
                    </td>
                    <td>{variety.Species || 'N/A'}</td>
                    <td>{variety.SeasonID || 'N/A'}</td>
                    <td>{getStatusBadge(variety.Status)}</td>
                    <td>
                      <small className="text-muted">
                        {variety.CreatedDate ? new Date(variety.CreatedDate).toLocaleDateString() : 'N/A'}
                      </small>
                    </td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button 
                          variant="outline-primary" 
                          onClick={() => handleEdit(variety)}
                          className="rounded-pill me-1"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button 
                          variant="outline-info" 
                          className="rounded-pill me-1"
                        >
                          <Eye size={14} />
                        </Button>
                        <Dropdown>
                          <Dropdown.Toggle 
                            variant="outline-secondary" 
                            size="sm" 
                            className="rounded-pill"
                          >
                            <MoreVertical size={14} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleEdit(variety)}>
                              <Edit2 size={14} className="me-2" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Eye size={14} className="me-2" />
                              View Details
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              className="text-danger"
                              onClick={() => handleDelete(variety)}
                            >
                              <Trash2 size={14} className="me-2" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </Table>
        </motion.div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <Edit2 size={20} className="me-2" />
            Edit Variety
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Variety Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.VarietyCode || ''}
                    onChange={(e) => setEditForm({...editForm, VarietyCode: e.target.value})}
                    className="modern-form-control"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Variety Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.VarietyName || ''}
                    onChange={(e) => setEditForm({...editForm, VarietyName: e.target.value})}
                    className="modern-form-control"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Crop Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.CropCode || ''}
                    onChange={(e) => setEditForm({...editForm, CropCode: e.target.value})}
                    className="modern-form-control"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Species</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.Species || ''}
                    onChange={(e) => setEditForm({...editForm, Species: e.target.value})}
                    className="modern-form-control"
                  />
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editForm.Description || ''}
                onChange={(e) => setEditForm({...editForm, Description: e.target.value})}
                className="modern-form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave} className="btn-modern">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <Trash2 size={20} className="me-2" />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the variety <strong>{selectedVariety?.VarietyName}</strong>?</p>
          <p className="text-muted small">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VarietiesTable;