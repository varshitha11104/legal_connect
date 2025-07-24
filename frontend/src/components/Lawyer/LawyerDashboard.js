import React, { useEffect, useState } from "react";
import axios from "axios";

const LawyerDashboard = () => {
  const [role, setRole] = useState("");
  const [userCases, setUserCases] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole === "lawyer") {
      fetchPendingClients();
    }
  }, []);

  const fetchPendingClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/lawyer/clients/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/lawyer/clients/${id}/status`,
        { status: decision },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the list
      fetchPendingClients();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (role !== "lawyer") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Lawyer not found
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

  {userCases.length === 0 && (
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
  )}

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
          <strong>Client: </strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Description:</strong> {user.description}
        </p>
        <p>
          <strong>Submitted by:</strong> {user.clientUser?.fullName}
        </p>
        <p style={{ paddingLeft: "110px" }}>{user.clientUser?.email}</p>
        <p>
          <strong>Submitted on:</strong>{" "}
          {new Date(user.createdAt).toLocaleString()}
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
