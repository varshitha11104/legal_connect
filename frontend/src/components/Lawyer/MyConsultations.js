// frontend/src/components/LawyerDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const LawyerDashboard = () => {
  const [role, setRole] = useState("");
  const [userCases, setUserCases] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole === "lawyer") {
      fetchClients();
    }
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/lawyer/v1/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
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
      <h1 style={{ textAlign: "center" }}>Your Current Cases</h1>

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
              position: "relative",
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

            <div
              style={{
                position: "absolute",
                bottom: "220px",
                right: "20px",
                backgroundColor:
                  user.status === "Accepted"
                    ? "#d4edda"
                    : user.status === "Rejected"
                    ? "#f8d7da"
                    : "#f0f0f0",
                color:
                  user.status === "Accepted"
                    ? "#155724"
                    : user.status === "Rejected"
                    ? "#721c24"
                    : "#333",
                padding: "8px 12px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Status: {user.status || "Pending"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerDashboard;
