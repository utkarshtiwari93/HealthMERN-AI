import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found, please login again.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
                    console.log(config);


        const { data } = await axios.get(
          "http://127.0.0.1:5000/api/users/profile",
          config
        );
        setUser(data);
      } catch (err) {
        setError("Not authorized or session expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.put(
        "http://127.0.0.1:5000/api/users/profile",
        {
          name: user.name,
          email: user.email,
          password: user.password, // optional
        },
        config
      );

      setUser(data);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      alert("❌ Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <div>
          <h3>Welcome, {user.name} 👋</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          {/* Update Profile Form */}
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <br />
            <br />

            <input
              type="email"
              value={user.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br />
            <br />

            <input
              type="password"
              placeholder="New Password (optional)"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <br />
            <br />

            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        !error && <p>Loading profile...</p>
      )}
    </div>
  );
}

export default DashboardPage;
