import React, { useEffect, useState } from "react";
import axios from "axios";

const LawyerDashboard = () => {
  const [role, setRole] = useState("");
  const [userCases, setUserCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole === "lawyer") {
      fetchPendingClients();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPendingClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/lawyer/clients/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCases(res.data || []);
    } catch (err) {
      console.error("Error fetching cases:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE}/api/lawyer/clients/${id}/status`,
        { status: decision },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingClients(); // Refresh after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (role !== "lawyer") {
    return (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2>Unauthorized</h2>
        <p>Only lawyers can access this dashboard.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "linear-gradient(to bottom right, #F7CFD8, #F4F8D3)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Welcome, Lawyer</h1>

      {userCases.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#555",
            marginTop: "30px",
          }}
        >
          You currently don't have any new requests.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {userCases.map((user) => (
            <div
              key={user.id}
              style={{
                background: "#fff",
                padding: "20px",
                width: "45%",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                minWidth: "280px",
              }}
            >
              <h3>{user.issue || "Untitled Case"}</h3>
              <p>
                <strong>Client:</strong> {user.fullName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {user.description || "No description"}
              </p>
              <p>
                <strong>Submitted by:</strong> {user.clientUser?.fullName || "Unknown"}
              </p>
              <p style={{ paddingLeft: "110px" }}>{user.clientUser?.email || ""}</p>
              <p>
                <strong>Submitted on:</strong>{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "Unknown"}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDecision(user.id, "Accepted")}
                  style={buttonStyle("#4CAF50")}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(user.id, "Rejected")}
                  style={buttonStyle("#f44336")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "white",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
});

export default LawyerDashboard;
