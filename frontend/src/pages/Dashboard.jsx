import React, { useContext, useEffect } from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import { DataContext } from "../context/DataContext";

function Dashboard() {
  const {
    varieties, fetchVarieties,
    crops, fetchCrops,
    greenhouses, fetchGreenhouses,
    forecast, fetchForecast,
    tasks, fetchTasks,
  } = useContext(DataContext);

  // Ensure arrays are always defined
  const safeVarieties = varieties ?? [];
  const safeCrops = crops ?? [];
  const safeGreenhouses = greenhouses ?? [];
  const safeForecast = forecast ?? [];
  const safeTasks = tasks ?? [];

  useEffect(() => {
    fetchVarieties?.();
    fetchCrops?.();
    fetchGreenhouses?.();
    fetchForecast?.();
    fetchTasks?.();
  }, [fetchVarieties, fetchCrops, fetchGreenhouses, fetchForecast, fetchTasks]);

  return (
    <div>
      <h1 className="mb-4">Supply Chain Dashboard</h1>
      <Row className="mb-4">
        <Col md={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>
                <Badge bg="primary" className="fs-4">{safeVarieties.length}</Badge>
              </Card.Title>
              <Card.Text>Varieties</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>
                <Badge bg="success" className="fs-4">{safeCrops.length}</Badge>
              </Card.Title>
              <Card.Text>Crops</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>
                <Badge bg="info" className="fs-4">{safeGreenhouses.length}</Badge>
              </Card.Title>
              <Card.Text>Greenhouses</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>
                <Badge bg="warning" className="fs-4">{safeForecast.length}</Badge>
              </Card.Title>
              <Card.Text>Forecasts</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>
                <Badge bg="dark" className="fs-4">{safeTasks.length}</Badge>
              </Card.Title>
              <Card.Text>Tasks</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mt-5 mb-3">Upcoming Tasks</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Greenhouse</th>
            <th>Variety</th>
            <th>Crop</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {safeTasks.slice(0, 5).map((task) => (
            <tr key={task.TaskID}>
              <td>{task.TaskName}</td>
              <td>{task.Greenhouse}</td>
              <td>{task.VarietyCode}</td>
              <td>{task.CropCode}</td>
              <td>{task.TaskDate && new Date(task.TaskDate).toLocaleDateString()}</td>
              <td>
                <Badge bg={task.TaskStatus === "Completed" ? "success" : "warning"}>
                  {task.TaskStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;