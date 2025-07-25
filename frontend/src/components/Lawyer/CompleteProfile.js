// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CompleteProfile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     specialization: "",
//     numberOfCasesDealtWith: "",
//     numberOfCasesWon: "",
//     numberOfCasesLost: "",
//     fee: "",
//     shortDescription: "",
//     profileImage: "", // Will store base64 string for image
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [isEditable, setIsEditable] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchLawyer = async () => {
//       if (token) {
//         try {
//           const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/private-api/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           const user = res.data;
//           setIsEditing(true);
//           setFormData({
//             name: user.name || "",
//             email: user.email || "",
//             specialization: user.specialization || "",
//             numberOfCasesDealtWith: user.casesDealtWith || "",
//             numberOfCasesWon: user.casesWon || "",
//             numberOfCasesLost: user.casesLost || "",
//             fee: user.fee || "",
//             shortDescription: user.description || "",
//             profileImage: user.profileImage || "", // Set base64 string here
//           });
//         } catch (err) {
//           console.error("Error fetching lawyer profile:", err);
//         }
//       }
//     };

//     fetchLawyer();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prevData) => ({
//         ...prevData,
//         profileImage: file,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSubmit = new FormData();
//     for (const key in formData) {
//       formDataToSubmit.append(key, formData[key]);
//     }

//     try {
//       await axios.put(
//         '${process.env.REACT_APP_API_BASE_URL}/private-api/update-profile',
//         formDataToSubmit,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Profile updated successfully!");
//       setIsEditable(false);
//     } catch (error) {
//       console.error("Error saving profile:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>{isEditing ? "Your Profile" : "Complete Your Profile"}</h2>
//       <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }} encType="multipart/form-data">
//         {/* Image Upload Section */}
//         <div style={{ display: "flex", marginBottom: "12px", alignItems: "center" }}>
//           <label style={{ width: "200px", fontWeight: "bold" }}>Profile Image:</label>
//           <input
//             type="file"
//             name="profileImage"
//             onChange={handleImageChange}
//             disabled={!isEditable}
//             style={{ flex: 1, padding: "6px" }}
//           />
//         </div>

//         {/* Display the profile image if available */}
//         {formData.profileImage && (
//           <div style={{ marginBottom: "12px" }}>
//             <img
//               src={formData.profileImage}
//               alt="Profile Preview"
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//           </div>
//         )}

//         {/* Other form fields */}
//         {[  
//           { label: "Full Name", name: "name" },
//           { label: "Email", name: "email" },
//           { label: "Specialization", name: "specialization" },
//           { label: "Cases Dealt With", name: "numberOfCasesDealtWith" },
//           { label: "Cases Won", name: "numberOfCasesWon" },
//           { label: "Cases Lost", name: "numberOfCasesLost" },
//           { label: "Fee (INR)", name: "fee" },
//         ].map(({ label, name }) => (
//           <div key={name} style={{ display: "flex", marginBottom: "12px", alignItems: "center" }}>
//             <label style={{ width: "200px", fontWeight: "bold" }}>{label}:</label>
//             <input
//               type={name === "email" ? "email" : "text"}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               required
//               readOnly={!isEditable}
//               style={{ flex: 1, padding: "6px" }}
//             />
//           </div>
//         ))}

//         {/* Short Description */}
//         <div style={{ display: "flex", marginBottom: "12px", alignItems: "flex-start" }}>
//           <label style={{ width: "200px", fontWeight: "bold" }}>Short Description:</label>
//           <textarea
//             name="shortDescription"
//             value={formData.shortDescription}
//             onChange={handleChange}
//             required
//             readOnly={!isEditable}
//             style={{ flex: 1, padding: "6px", minHeight: "80px" }}
//           ></textarea>
//         </div>

//         {/* Save or Edit Button */}
//         {isEditable && (
//           <button
//             type="submit"
//             style={{
//               backgroundColor: "red",
//               color: "white",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Save Profile
//           </button>
//         )}

//         {isEditing && !isEditable && (
//           <button
//             onClick={() => setIsEditable(true)}
//             style={{
//               backgroundColor: "#007bff",
//               color: "white",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Edit Profile
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CompleteProfile;


import React, { useState, useEffect } from "react";
import axios from "axios";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    numberOfCasesDealtWith: "",
    numberOfCasesWon: "",
    numberOfCasesLost: "",
    fee: "",
    shortDescription: "",
    profileImage: "", // Can be URL string or File object
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/private-api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        setIsEditing(true);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          specialization: user.specialization || "",
          numberOfCasesDealtWith: user.casesDealtWith || "",
          numberOfCasesWon: user.casesWon || "",
          numberOfCasesLost: user.casesLost || "",
          fee: user.fee || "",
          shortDescription: user.description || "",
          profileImage: user.profileImage || "", // Existing image URL or base64
        });
      } catch (err) {
        console.error("Error fetching lawyer profile:", err);
      }
    };

    fetchLawyer();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (key === "profileImagePreview") continue;
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/private-api/update-profile`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving profile:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {isEditing ? "Your Profile" : "Complete Your Profile"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "auto" }}
        encType="multipart/form-data"
      >
        {/* Profile Image Upload */}
        <div style={{ display: "flex", marginBottom: "12px", alignItems: "center" }}>
          <label style={{ width: "200px", fontWeight: "bold" }}>Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            disabled={!isEditable}
            style={{ flex: 1 }}
          />
        </div>

        {/* Profile Image Preview */}
        {(formData.profileImagePreview || typeof formData.profileImage === "string") && (
          <div style={{ marginBottom: "12px", textAlign: "center" }}>
            <img
              src={
                formData.profileImagePreview
                  ? formData.profileImagePreview
                  : formData.profileImage
              }
              alt="Profile Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        )}

        {/* Text Fields */}
        {[
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Specialization", name: "specialization" },
          { label: "Cases Dealt With", name: "numberOfCasesDealtWith" },
          { label: "Cases Won", name: "numberOfCasesWon" },
          { label: "Cases Lost", name: "numberOfCasesLost" },
          { label: "Fee (INR)", name: "fee" },
        ].map(({ label, name, type }) => (
          <div
            key={name}
            style={{ display: "flex", marginBottom: "12px", alignItems: "center" }}
          >
            <label style={{ width: "200px", fontWeight: "bold" }}>{label}:</label>
            <input
              type={type || "text"}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              readOnly={!isEditable}
              style={{ flex: 1, padding: "6px" }}
            />
          </div>
        ))}

        {/* Description */}
        <div style={{ display: "flex", marginBottom: "12px", alignItems: "flex-start" }}>
          <label style={{ width: "200px", fontWeight: "bold" }}>Short Description:</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            readOnly={!isEditable}
            style={{ flex: 1, padding: "6px", minHeight: "80px" }}
          ></textarea>
        </div>

        {/* Buttons */}
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

export default CompleteProfile;
