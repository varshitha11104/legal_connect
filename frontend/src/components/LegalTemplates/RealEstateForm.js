import React, { useState } from "react";
import jsPDF from "jspdf";

const RealEstateForm = ({onSelectCategory}) => {
  const [formData, setFormData] = useState({
    date: "",
    city: "",
    state: "",
    ownerName: "",
    ownerAddress: "",
    agentName: "",
    agentAddress: "",
    propertyAddress: "",
    specialPowers: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Real Estate Power of Attorney", 20, 20);
    doc.text(
      `This Real Estate Power of Attorney (the "Agreement") is made this ${formData.date} day of ${formData.city}, ${formData.state}.`,
      20,
      30
    );
    doc.text(
      `Owner: ${formData.ownerName}, Address: ${formData.ownerAddress}`,
      20,
      40
    );
    doc.text(
      `Agent: ${formData.agentName}, Address: ${formData.agentAddress}`,
      20,
      50
    );
    doc.text(`Property Address: ${formData.propertyAddress}`, 20, 60);
    doc.text("Agent's Responsibilities:", 20, 70);
    doc.text(formData.specialPowers || "_________", 20, 80, { maxWidth: 170 });
    doc.save("RealEstate_PowerOfAttorney.pdf");
  };

  return (
    <div className="p-6">
      <button
            className="primary"
            onClick={() => onSelectCategory("")}
          >BACK</button>
      <h2 className="text-2xl font-bold mb-4">
        Real Estate Power of Attorney Form
      </h2>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Date", name: "date" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Owner Name", name: "ownerName" },
          { label: "Owner Address", name: "ownerAddress" },
          { label: "Agent Name", name: "agentName" },
          { label: "Agent Address", name: "agentAddress" },
          { label: "Property Address", name: "propertyAddress" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">
            Special Powers Granted to Agent
          </label>
          <textarea
            name="specialPowers"
            value={formData.specialPowers}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded h-24"
            placeholder="E.g., To sell the property, handle repairs, collect rent, etc."
          />
        </div>
      </div>

      {/* Dynamic Preview */}
      <div className="border-4 border-blue-600 p-6 rounded-lg mb-4 bg-white shadow">
        <h3 className="text-xl font-semibold text-center mb-2 underline">
          Real Estate Power of Attorney
        </h3>
        <p>
          This Real Estate Power of Attorney (the "Agreement") is made this{" "}
          <strong>{formData.date || "_____"}</strong> day of{" "}
          <strong>{formData.city || "_____"}</strong>,{" "}
          <strong>{formData.state || "_____"}</strong>.
        </p>
        <p>
          <strong>Owner:</strong> {formData.ownerName || "_____"}, Address:{" "}
          {formData.ownerAddress || "_____"}
        </p>
        <p>
          <strong>Agent:</strong> {formData.agentName || "_____"}, Address:{" "}
          {formData.agentAddress || "_____"}
        </p>
        <p>
          <strong>Property Address:</strong>{" "}
          {formData.propertyAddress || "_____"}
        </p>
        <p>
          <strong>Agent’s Responsibilities:</strong>{" "}
          {formData.specialPowers || "_____"}
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default RealEstateForm;
