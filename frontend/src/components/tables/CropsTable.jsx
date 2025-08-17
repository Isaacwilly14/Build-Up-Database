import React from "react";
import { Table, Button } from "react-bootstrap";

function CropsTable({ crops }) {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>CropCode</th>
          <th>CropName</th>
          <th>Description</th>
          <th>DataType</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {crops.map((c) => (
          <tr key={c.CropCode}>
            <td>{c.CropCode}</td>
            <td>{c.CropName}</td>
            <td>{c.Description}</td>
            <td>{c.DataType}</td>
            <td>
              <Button variant="info" size="sm" disabled>Edit</Button>{" "}
              <Button variant="danger" size="sm" disabled>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default CropsTable;