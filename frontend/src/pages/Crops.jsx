import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DataContext } from "../context/DataContext";
import CropsTable from "../components/tables/CropsTable";
import CropForm from "../components/forms/CropForm";

function Crops() {
  const { crops, fetchCrops } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  return (
    <div>
      <h2>Crops</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Crop
      </Button>
      <CropsTable crops={crops} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Crop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CropForm onSuccess={() => {setShowModal(false); fetchCrops();}} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Crops;