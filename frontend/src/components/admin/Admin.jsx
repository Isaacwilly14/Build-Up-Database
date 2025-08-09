import { useEffect, useState } from "react";
import axios from "axios";
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Fetch users from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users", formData)
      .then((res) => {
        setUsers([...users, res.data]);
        setFormData({ email: "", password: "", username: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <Header />
        <Sidebar />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            {/* <h1 class="h2">Dashboard</h1> */}
            <h2 className="mb-4">Admin Panel</h2>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group me-2">
                {" "}
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Share
                </button>{" "}
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Export
                </button>{" "}
              </div>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
              >
                <svg class="bi" aria-hidden="true">
                  <use xlink:href="#calendar3"></use>
                </svg>
                This week
              </button>
            </div>
          </div>

          <div className="container mt-5">

            {/* Add User Form */}
            <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm">
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </form>

            {/* Users Table */}
            <h2>Users</h2>
            <div class="table-responsive small">
              <table className="table table-striped table-hover table-sm">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 
          </div>
        </main>
      </div>
    </div>
  );
}
