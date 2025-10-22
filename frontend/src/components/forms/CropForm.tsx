import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../services/api";

function CropForm() {
  const [form, setForm] = useState({
    cropCode: "",
    subGroup: "",
    cropName: "",
    seasonCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addCrop(form);
      alert("Crop saved successfully!");
      setForm({ cropCode: "", subGroup: "", cropName: "", seasonCode: "" });
    } catch (error) {
      console.error("Error saving crop:", error);
      alert("Failed to save crop.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Crop Code</Form.Label>
        <Form.Control
          name="cropCode"
          value={form.cropCode}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Sub Group</Form.Label>
        <Form.Control
          name="subGroup"
          value={form.subGroup}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Crop Name</Form.Label>
        <Form.Control
          name="cropName"
          value={form.cropName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Season Code</Form.Label>
        <Form.Control
          name="seasonCode"
          value={form.seasonCode}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Save
      </Button>
    </Form>
  );
}

export default CropForm;
