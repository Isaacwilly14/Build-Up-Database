import React from "react";
import { Table, Button } from "react-bootstrap";

function VarietiesTable({ varieties }) {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>VarietyCode</th>
          <th>VarietyName</th>
          <th>CropCode</th>
          <th>SeasonID</th>
          <th>SensID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {varieties.map((v) => (
          <tr key={v.VarietyCode}>
            <td>{v.VarietyCode}</td>
            <td>{v.VarietyName}</td>
            <td>{v.CropCode}</td>
            <td>{v.SeasonID}</td>
            <td>{v.SensID}</td>
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

export default VarietiesTable;