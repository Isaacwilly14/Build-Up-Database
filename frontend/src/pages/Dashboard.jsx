import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  BarChart3,
  Activity
} from "lucide-react";
import { DataContext } from "../context/DataContext";

function Dashboard() {
  const {
    varieties, fetchVarieties,
    crops, fetchCrops,
    greenhouses, fetchGreenhouses,
    forecast, fetchForecast,
    tasks, fetchTasks,
  } = useContext(DataContext);

  const [loading, setLoading] = useState(true);

  // Ensure arrays are always defined
  const safeVarieties = varieties ?? [];
  const safeCrops = crops ?? [];
  const safeGreenhouses = greenhouses ?? [];
  const safeForecast = forecast ?? [];
  const safeTasks = tasks ?? [];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchVarieties?.(),
        fetchCrops?.(),
        fetchGreenhouses?.(),
        fetchForecast?.(),
        fetchTasks?.()
      ]);
      setLoading(false);
    };
    loadData();
  }, [fetchVarieties, fetchCrops, fetchGreenhouses, fetchForecast, fetchTasks]);

  // Sample data for charts
  const monthlyData = [
    { name: 'Jan', varieties: 12, crops: 8, production: 2400 },
    { name: 'Feb', varieties: 15, crops: 12, production: 3200 },
    { name: 'Mar', varieties: 18, crops: 15, production: 2800 },
    { name: 'Apr', varieties: 22, crops: 18, production: 3800 },
    { name: 'May', varieties: 25, crops: 20, production: 4200 },
    { name: 'Jun', varieties: 28, crops: 24, production: 4800 }
  ];

  const statusData = [
    { name: 'Completed', value: safeTasks.filter(t => t.TaskStatus === 'Completed').length, color: '#10b981' },
    { name: 'In Progress', value: safeTasks.filter(t => t.TaskStatus === 'In Progress').length, color: '#f59e0b' },
    { name: 'Pending', value: safeTasks.filter(t => t.TaskStatus === 'Pending').length, color: '#ef4444' }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={cardVariants} className="mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="display-6 fw-bold text-primary mb-2">Supply Chain Dashboard</h1>
            <p className="text-muted">Welcome back! Here's what's happening with your agricultural operations.</p>
          </div>
          <Button className="btn-modern btn-primary">
            <Calendar size={16} className="me-2" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <Row className="mb-5">
        <Col lg={3} md={6} className="mb-4">
          <motion.div variants={cardVariants}>
            <Card className="stat-card gradient-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{safeVarieties.length}</div>
                    <div className="stat-label text-white">Total Varieties</div>
                  </div>
                  <TrendingUp size={40} className="text-white opacity-75" />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <motion.div variants={cardVariants}>
            <Card className="stat-card gradient-card success">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{safeCrops.length}</div>
                    <div className="stat-label text-white">Active Crops</div>
                  </div>
                  <Activity size={40} className="text-white opacity-75" />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <motion.div variants={cardVariants}>
            <Card className="stat-card gradient-card warning">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{safeGreenhouses.length}</div>
                    <div className="stat-label text-white">Greenhouses</div>
                  </div>
                  <BarChart3 size={40} className="text-white opacity-75" />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <motion.div variants={cardVariants}>
            <Card className="stat-card gradient-card secondary">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{safeTasks.length}</div>
                    <div className="stat-label text-white">Total Tasks</div>
                  </div>
                  <CheckCircle size={40} className="text-white opacity-75" />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="mb-5">
        <Col lg={8} className="mb-4">
          <motion.div variants={cardVariants}>
            <Card className="modern-card chart-container">
              <Card.Body>
                <h5 className="mb-4 fw-bold">Production Trends</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="production" 
                      stroke="#667eea" 
                      strokeWidth={3}
                      dot={{ fill: '#667eea', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="varieties" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        
        <Col lg={4} className="mb-4">
          <motion.div variants={cardVariants}>
            <Card className="modern-card chart-container">
              <Card.Body>
                <h5 className="mb-4 fw-bold">Task Status Distribution</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {statusData.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle me-2" 
                          style={{ width: 12, height: 12, backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <Badge bg="light" text="dark">{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Recent Tasks */}
      <motion.div variants={cardVariants}>
        <Card className="modern-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Recent Tasks</h5>
              <Button variant="outline-primary" size="sm" className="rounded-pill">
                View All
              </Button>
            </div>
            
            <div className="table-responsive">
              <Table className="modern-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Greenhouse</th>
                    <th>Variety</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {safeTasks.slice(0, 8).map((task, index) => (
                    <tr key={task.TaskID || index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="task-icon me-3">
                            {task.TaskStatus === 'Completed' ? 
                              <CheckCircle size={16} className="text-success" /> :
                              <AlertCircle size={16} className="text-warning" />
                            }
                          </div>
                          <strong>{task.TaskName}</strong>
                        </div>
                      </td>
                      <td>{task.Greenhouse}</td>
                      <td>
                        <Badge bg="light" text="dark" className="modern-badge">
                          {task.VarietyCode}
                        </Badge>
                      </td>
                      <td>{task.TaskDate && new Date(task.TaskDate).toLocaleDateString()}</td>
                      <td>
                        <Badge 
                          bg={task.TaskStatus === "Completed" ? "success" : 
                              task.TaskStatus === "In Progress" ? "warning" : "danger"}
                          className="modern-badge"
                        >
                          {task.TaskStatus}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="rounded-pill">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;