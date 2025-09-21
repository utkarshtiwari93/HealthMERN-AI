import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

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
              <Link to="/profile">Profile</Link> |{" "}
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RegisterPage />} />
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
