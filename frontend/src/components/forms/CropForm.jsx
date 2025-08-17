import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../services/api";
import { DataContext } from "../../context/DataContext";

function CropForm({ onSuccess }) {
  const [form, setForm] = useState({
    CropCode: "",
    CropName: "",
    Description: "",
    DataType: "",
  });
  const { fetchCrops } = useContext(DataContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addCrop(form);
    fetchCrops();
    onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Crop Code</Form.Label>
        <Form.Control
          name="CropCode"
          value={form.CropCode}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Crop Name</Form.Label>
        <Form.Control
          name="CropName"
          value={form.CropName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="Description"
          value={form.Description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Data Type</Form.Label>
        <Form.Control
          name="DataType"
          value={form.DataType}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Save
      </Button>
    </Form>
  );
}
export default CropForm;