import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>HealthMERN-AI</h1>

        {/* Navbar */}
        <nav style={{ marginBottom: "20px" }}>
          {!token ? (
            <>
              <Link to="/register">Register</Link> |{" "}
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link> |{" "}
              <Link to="/login" onClick={() => localStorage.clear()}>
                Logout
              </Link>
            </>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Default route */}
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
