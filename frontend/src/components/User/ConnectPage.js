import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import lawyers from "../../data/lawyers_dummy_data";
import axios from "axios";

const ConnectPage = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);

  useEffect(() => {
    const selectedLawyer = lawyers.find((lawyer) => lawyer.id === 1);
    setLawyer(selectedLawyer);
  }, [id]);

  const handleBack = () => {
    navigate("/main");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    shortDescription: "",
    caseDescription: "",
  });

  const handleSubmit =async (e) => {
    e.preventDefault();

    const token=localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/api/lawyer/connect/${id}`,
        formData,{
        headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Your request has been submitted successfully.');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Something went wrong. Please try again.');
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!lawyer)
    return <div className="p-8 text-xl italic text-center">Loading...</div>;

  return (
    <div
      className="min-h-screen p-6 sm:p-10"
      style={{
        background: "linear-gradient(to bottom right, #BDDDE4, #FFF1D5)",
        fontStyle: "italic",
      }}
    >
      <div className="flex justify-center mb-6">
        <button
          onClick={handleBack}
          className="px-6 py-3 text-white font-semibold rounded shadow"
          style={{ backgroundColor: "#2563eb", fontStyle: "normal" }}
        >
          Go Back
        </button>
      </div>


      <div className="md:w-1/2 bg-white shadow-2xl rounded-xl p-8">
        <h3
          className="text-3xl font-semibold mb-6 text-center"
          style={{ fontStyle: "normal" }}
        >
          Connect with {name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5 text-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-4 border italic rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-4 border italic rounded"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-4 border italic rounded"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-4 border italic rounded"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-4 border italic rounded"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 font-medium">Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Short Description"
              className="w-full p-4 border italic rounded h-20"
              required
            ></textarea>
          </div>

          {/* Case Description */}
          <div>
            <label className="block mb-1 font-medium">Describe your case</label>
            <textarea
              name="caseDescription"
              value={formData.caseDescription}
              onChange={handleChange}
              placeholder="Describe your case..."
              className="w-full p-4 border italic rounded h-32"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 text-white font-bold rounded"
            style={{ backgroundColor: "#2563eb", fontStyle: "normal" }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConnectPage;
