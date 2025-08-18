import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { User, Lock, LogIn, Eye, EyeOff } from "lucide-react";

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const success = await login(form.username, form.password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="login-page" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Card className="glass-card border-0 shadow-lg">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="login-icon mb-3"
                    >
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                           style={{ width: 80, height: 80 }}>
                        <i className="bi bi-graph-up text-white" style={{ fontSize: '2rem' }}></i>
                      </div>
                    </motion.div>
                    <h2 className="fw-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-white-50">Sign in to Build UP ERP</p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-3"
                    >
                      <Alert variant="danger" className="border-0 rounded-3">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Form.Group className="mb-4">
                        <Form.Label className="text-white fw-semibold">Username</Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="modern-form-control ps-5"
                            placeholder="Enter your username"
                            style={{
                              background: "rgba(255, 255, 255, 0.15)",
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                              color: "white"
                            }}
                          />
                          <User 
                            size={18} 
                            className="position-absolute text-white-50" 
                            style={{ top: "50%", left: "15px", transform: "translateY(-50%)" }}
                          />
                        </div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Form.Group className="mb-4">
                        <Form.Label className="text-white fw-semibold">Password</Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="modern-form-control ps-5 pe-5"
                            placeholder="Enter your password"
                            style={{
                              background: "rgba(255, 255, 255, 0.15)",
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                              color: "white"
                            }}
                          />
                          <Lock 
                            size={18} 
                            className="position-absolute text-white-50" 
                            style={{ top: "50%", left: "15px", transform: "translateY(-50%)" }}
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute text-white-50 p-0"
                            style={{ top: "50%", right: "15px", transform: "translateY(-50%)" }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button 
                        variant="light" 
                        type="submit" 
                        className="w-100 btn-modern py-3 fw-semibold"
                        disabled={loading}
                        style={{
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          color: "#667eea"
                        }}
                      >
                        {loading ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Signing In...
                          </>
                        ) : (
                          <>
                            <LogIn size={18} className="me-2" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center mt-4"
                    >
                      <small className="text-white-50">
                        Don't have an account? <a href="#" className="text-white fw-semibold">Contact Admin</a>
                      </small>
                    </motion.div>
                  </Form>
                </Card.Body>
              </Card>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center mt-4"
              >
                <small className="text-white-50">
                  &copy; 2025 Build UP ERP. All rights reserved.
                </small>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;