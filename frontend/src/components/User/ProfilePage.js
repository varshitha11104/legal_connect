import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "",
    createdAt: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/private-api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res.data;

        setFormData({
          username: profile.username || "",
          fullName: profile.fullName || "",
          email: profile.email || "",
          role: profile.role || "",
          createdAt: new Date(profile.createdAt).toLocaleDateString() || "",
        });

        setIsEditing(true);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/private-api/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
      setIsEditable(false);
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  const editableFields = [
    { label: "Username", name: "username" },
    { label: "Full Name", name: "fullName" },
    { label: "Email", name: "email", type: "email" },
  ];

  const readonlyFields = [
    { label: "Role", name: "role" },
    { label: "Member Since", name: "createdAt" },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Your Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {[...editableFields, ...readonlyFields].map(({ label, name, type }) => (
          <div
            key={name}
            style={{
              display: "flex",
              marginBottom: "12px",
              alignItems: "center",
            }}
          >
            <label style={{ width: "200px", fontWeight: "bold" }}>
              {label}:
            </label>
            <input
              type={type || "text"}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              readOnly={!isEditable || readonlyFields.some(f => f.name === name)}
              style={{ flex: 1, padding: "6px" }}
            />
          </div>
        ))}

        {isEditable ? (
          <button
            type="submit"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Save Profile
          </button>
        ) : (
          isEditing && (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Edit Profile
            </button>
          )
        )}
      </form>
    </div>
  );
};

export default UserProfile;
