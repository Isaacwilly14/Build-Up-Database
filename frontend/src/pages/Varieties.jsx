import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DataContext } from "../context/DataContext";
import VarietiesTable from "../components/tables/VarietiesTable";
import VarietyForm from "../components/forms/VarietyForm";

function Varieties() {
  const { varieties, fetchVarieties } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchVarieties();
  }, [fetchVarieties]);

  return (
    <div>
      <h2>Varieties</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Variety
      </Button>
      <VarietiesTable varieties={varieties} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Variety</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VarietyForm onSuccess={() => {setShowModal(false); fetchVarieties();}} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Varieties;