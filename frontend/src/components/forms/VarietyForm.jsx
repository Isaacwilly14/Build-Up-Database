import React, { useState, useContext } from "react";
import { Form, Button, Alert, Row, Col, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { Save, X, AlertCircle } from "lucide-react";
import { DataContext } from "../../context/DataContext";

function VarietyForm({ onSuccess, initialData = null, isEdit = false }) {
  const { createVariety, updateVariety, crops, seasons } = useContext(DataContext);
  
  const [form, setForm] = useState({
    VarietyCode: initialData?.VarietyCode || "",
    VarietyName: initialData?.VarietyName || "",
    CropCode: initialData?.CropCode || "",
    Species: initialData?.Species || "",
    SeasonID: initialData?.SeasonID || "",
    SensID: initialData?.SensID || "",
    Description: initialData?.Description || "",
    PlantingDensity: initialData?.PlantingDensity || "",
    GrowthPeriod: initialData?.GrowthPeriod || "",
    YieldPerPlant: initialData?.YieldPerPlant || "",
    MinTemperature: initialData?.MinTemperature || "",
    MaxTemperature: initialData?.MaxTemperature || "",
    OptimalPH: initialData?.OptimalPH || "",
    WateringFrequency: initialData?.WateringFrequency || "",
    Status: initialData?.Status || "Active"
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.VarietyCode.trim()) {
      newErrors.VarietyCode = "Variety code is required";
    } else if (form.VarietyCode.length < 2) {
      newErrors.VarietyCode = "Variety code must be at least 2 characters";
    }
    
    if (!form.VarietyName.trim()) {
      newErrors.VarietyName = "Variety name is required";
    }
    
    if (!form.CropCode.trim()) {
      newErrors.CropCode = "Crop code is required";
    }
    
    if (form.PlantingDensity && isNaN(form.PlantingDensity)) {
      newErrors.PlantingDensity = "Planting density must be a number";
    }
    
    if (form.GrowthPeriod && isNaN(form.GrowthPeriod)) {
      newErrors.GrowthPeriod = "Growth period must be a number";
    }
    
    if (form.YieldPerPlant && isNaN(form.YieldPerPlant)) {
      newErrors.YieldPerPlant = "Yield per plant must be a number";
    }
    
    if (form.MinTemperature && isNaN(form.MinTemperature)) {
      newErrors.MinTemperature = "Minimum temperature must be a number";
    }
    
    if (form.MaxTemperature && isNaN(form.MaxTemperature)) {
      newErrors.MaxTemperature = "Maximum temperature must be a number";
    }
    
    if (form.OptimalPH && (isNaN(form.OptimalPH) || form.OptimalPH < 0 || form.OptimalPH > 14)) {
      newErrors.OptimalPH = "Optimal pH must be a number between 0 and 14";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const varietyData = {
        ...form,
        CreatedDate: initialData?.CreatedDate || new Date().toISOString(),
        UpdatedDate: new Date().toISOString()
      };
      
      if (isEdit && initialData?.id) {
        await updateVariety(initialData.id, varietyData);
      } else {
        await createVariety(varietyData);
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving variety:', error);
      setErrors({ submit: 'Failed to save variety. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      VarietyCode: "",
      VarietyName: "",
      CropCode: "",
      Species: "",
      SeasonID: "",
      SensID: "",
      Description: "",
      PlantingDensity: "",
      GrowthPeriod: "",
      YieldPerPlant: "",
      MinTemperature: "",
      MaxTemperature: "",
      OptimalPH: "",
      WateringFrequency: "",
      Status: "Active"
    });
    setErrors({});
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {errors.submit && (
        <Alert variant="danger" className="mb-4">
          <AlertCircle size={16} className="me-2" />
          {errors.submit}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-4">
          <h6 className="text-primary fw-bold mb-3">Basic Information</h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Variety Code <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="VarietyCode"
                  value={form.VarietyCode}
                  onChange={handleChange}
                  className={`modern-form-control ${errors.VarietyCode ? 'is-invalid' : ''}`}
                  placeholder="e.g., TOM001"
                  disabled={isEdit}
                />
                {errors.VarietyCode && (
                  <div className="invalid-feedback">{errors.VarietyCode}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Variety Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="VarietyName"
                  value={form.VarietyName}
                  onChange={handleChange}
                  className={`modern-form-control ${errors.VarietyName ? 'is-invalid' : ''}`}
                  placeholder="e.g., Cherry Tomato Supreme"
                />
                {errors.VarietyName && (
                  <div className="invalid-feedback">{errors.VarietyName}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Crop Code <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="CropCode"
                  value={form.CropCode}
                  onChange={handleChange}
                  className={`modern-form-control ${errors.CropCode ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Crop</option>
                  {crops?.map(crop => (
                    <option key={crop.CropCode} value={crop.CropCode}>
                      {crop.CropCode} - {crop.CropName}
                    </option>
                  ))}
                </Form.Select>
                {errors.CropCode && (
                  <div className="invalid-feedback">{errors.CropCode}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Species</Form.Label>
                <Form.Control
                  name="Species"
                  value={form.Species}
                  onChange={handleChange}
                  className="modern-form-control"
                  placeholder="e.g., Solanum lycopersicum"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Season</Form.Label>
                <Form.Select
                  name="SeasonID"
                  value={form.SeasonID}
                  onChange={handleChange}
                  className="modern-form-control"
                >
                  <option value="">Select Season</option>
                  {seasons?.map(season => (
                    <option key={season.SeasonID} value={season.SeasonID}>
                      {season.SeasonName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select
                  name="Status"
                  value={form.Status}
                  onChange={handleChange}
                  className="modern-form-control"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Description"
              value={form.Description}
              onChange={handleChange}
              className="modern-form-control"
              placeholder="Describe the variety characteristics, growing conditions, etc."
            />
          </Form.Group>
        </div>

        {/* Growing Specifications */}
        <div className="mb-4">
          <h6 className="text-primary fw-bold mb-3">Growing Specifications</h6>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Planting Density</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="PlantingDensity"
                    value={form.PlantingDensity}
                    onChange={handleChange}
                    className={`modern-form-control ${errors.PlantingDensity ? 'is-invalid' : ''}`}
                    placeholder="0"
                    type="number"
                  />
                  <InputGroup.Text>plants/m²</InputGroup.Text>
                </InputGroup>
                {errors.PlantingDensity && (
                  <div className="invalid-feedback">{errors.PlantingDensity}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Growth Period</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="GrowthPeriod"
                    value={form.GrowthPeriod}
                    onChange={handleChange}
                    className={`modern-form-control ${errors.GrowthPeriod ? 'is-invalid' : ''}`}
                    placeholder="0"
                    type="number"
                  />
                  <InputGroup.Text>days</InputGroup.Text>
                </InputGroup>
                {errors.GrowthPeriod && (
                  <div className="invalid-feedback">{errors.GrowthPeriod}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Yield per Plant</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="YieldPerPlant"
                    value={form.YieldPerPlant}
                    onChange={handleChange}
                    className={`modern-form-control ${errors.YieldPerPlant ? 'is-invalid' : ''}`}
                    placeholder="0"
                    type="number"
                    step="0.01"
                  />
                  <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>
                {errors.YieldPerPlant && (
                  <div className="invalid-feedback">{errors.YieldPerPlant}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Environmental Conditions */}
        <div className="mb-4">
          <h6 className="text-primary fw-bold mb-3">Environmental Conditions</h6>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Min Temperature</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="MinTemperature"
                    value={form.MinTemperature}
                    onChange={handleChange}
                    className={`modern-form-control ${errors.MinTemperature ? 'is-invalid' : ''}`}
                    placeholder="0"
                    type="number"
                  />
                  <InputGroup.Text>°C</InputGroup.Text>
                </InputGroup>
                {errors.MinTemperature && (
                  <div className="invalid-feedback">{errors.MinTemperature}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Max Temperature</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="MaxTemperature"
                    value={form.MaxTemperature}
                    onChange={handleChange}
                    className={`modern-form-control ${errors.MaxTemperature ? 'is-invalid' : ''}`}
                    placeholder="0"
                    type="number"
                  />
                  <InputGroup.Text>°C</InputGroup.Text>
                </InputGroup>
                {errors.MaxTemperature && (
                  <div className="invalid-feedback">{errors.MaxTemperature}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Optimal pH</Form.Label>
                <Form.Control
                  name="OptimalPH"
                  value={form.OptimalPH}
                  onChange={handleChange}
                  className={`modern-form-control ${errors.OptimalPH ? 'is-invalid' : ''}`}
                  placeholder="6.5"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                />
                {errors.OptimalPH && (
                  <div className="invalid-feedback">{errors.OptimalPH}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Watering Frequency</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="WateringFrequency"
                    value={form.WateringFrequency}
                    onChange={handleChange}
                    className="modern-form-control"
                    placeholder="Daily"
                  />
                  <InputGroup.Text>/day</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between">
          <Button 
            type="button" 
            variant="outline-secondary" 
            onClick={handleReset}
            className="btn-modern"
          >
            <X size={16} className="me-2" />
            Reset
          </Button>
          
          <Button 
            type="submit" 
            variant="primary" 
            className="btn-modern"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="me-2" />
                {isEdit ? 'Update' : 'Create'} Variety
              </>
            )}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
}

export default VarietyForm;