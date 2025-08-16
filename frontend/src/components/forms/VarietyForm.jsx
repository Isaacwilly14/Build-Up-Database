import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../services/api";
import { DataContext } from "../../context/DataContext";

function VarietyForm({ onSuccess }) {
  const [form, setForm] = useState({
    VarietyCode: "",
    VarietyName: "",
    CropCode: "",
    SeasonID: "",
    SensID: "",
  });
  const { fetchVarieties } = useContext(DataContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addVariety(form);
    fetchVarieties();
    onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Variety Code</Form.Label>
        <Form.Control
          name="VarietyCode"
          value={form.VarietyCode}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Variety Name</Form.Label>
        <Form.Control
          name="VarietyName"
          value={form.VarietyName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Crop Code</Form.Label>
        <Form.Control
          name="CropCode"
          value={form.CropCode}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Season ID</Form.Label>
        <Form.Control
          name="SeasonID"
          value={form.SeasonID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Sensitivity ID</Form.Label>
        <Form.Control
          name="SensID"
          value={form.SensID}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Save
      </Button>
    </Form>
  );
}

export default VarietyForm;