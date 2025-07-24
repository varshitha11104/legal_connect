import React, { useState } from "react";
import jsPDF from "jspdf";
import "../../css/PopupStyles.css";

const LandPurchaseForm = ({onSelectCategory}) => {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
    sellerName: "",
    sellerType: "",
    buyerName: "",
    buyerType: "",
    propertyDescription: "",
    purchasePrice: "",
    personalProperty: "",
    closingDate: "",
    contingencies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("Times", "Normal");
    doc.setLineWidth(2);
    doc.setDrawColor(0, 0, 255);
    doc.rect(10, 10, 190, 277);

    let y = 20;
    const wrapText = (text) => doc.splitTextToSize(text, 180);
    const addText = (text, space = 7) => {
      const lines = wrapText(text);
      doc.text(lines, 15, y);
      y += lines.length * space;
    };

    doc.setFontSize(14);
    doc.text("REAL ESTATE PURCHASE AGREEMENT", 105, y, { align: "center" });
    y += 10;
    doc.setFontSize(12);

    addText(`This Agreement ("Agreement") is made on the ${formData.day} day of ${formData.month}, ${formData.year}, by and between ${formData.sellerName}, a(n) ${formData.sellerType}, hereinafter referred to as the "Seller", and ${formData.buyerName}, a(n) ${formData.buyerType}, hereinafter referred to as the "Buyer".`);

    addText(`1. PROPERTY: The Seller agrees to sell and the Buyer agrees to buy the following real estate:`);
    addText(formData.propertyDescription);

    addText(`2. PERSONAL PROPERTY: The following personal property is included in this sale:`);
    addText(formData.personalProperty || "None specified.");

    addText(`3. PURCHASE PRICE: The total purchase price for the Property is $${formData.purchasePrice}, payable at closing.`);

    addText(`4. CLOSING DATE: The closing shall occur on or before ${formData.closingDate}.`);

    addText(`5. CONTINGENCIES: This Agreement is contingent upon the following conditions:`);
    addText(formData.contingencies || "None.");

    addText(`6. GOVERNING LAW: This Agreement shall be governed by the laws of the jurisdiction in which the Property is located.`);

    addText(`7. ENTIRE AGREEMENT: This document represents the entire agreement between the parties and supersedes all prior negotiations.`);

    y += 15;
    doc.text("IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.", 15, y);
    y += 20;
    doc.text(`Seller: _____________________`, 15, y);
    doc.text(`Buyer: _____________________`, 115, y);

    doc.save("RealEstatePurchaseAgreement.pdf");
  };

  return (
    <div className="form-wrapper" style={{ padding: "20px" }}>
      <button
            className="primary"
            onClick={() => onSelectCategory("")}
          >BACK</button>
      <h2>Real Estate Purchase Agreement</h2>

      <form className="input-section" style={{ display: "grid", gap: "10px", maxWidth: "600px" }}>
        <input name="day" placeholder="Day" onChange={handleChange} />
        <input name="month" placeholder="Month" onChange={handleChange} />
        <input name="year" placeholder="Year" onChange={handleChange} />
        <input name="sellerName" placeholder="Seller Full Name" onChange={handleChange} />
        <input name="sellerType" placeholder="Seller Type (Individual/Corporation)" onChange={handleChange} />
        <input name="buyerName" placeholder="Buyer Full Name" onChange={handleChange} />
        <input name="buyerType" placeholder="Buyer Type (Individual/Corporation)" onChange={handleChange} />
        <textarea name="propertyDescription" placeholder="Property Description" rows="3" onChange={handleChange} />
        <textarea name="personalProperty" placeholder="Included Personal Property" rows="2" onChange={handleChange} />
        <input name="purchasePrice" placeholder="Purchase Price ($)" onChange={handleChange} />
        <input name="closingDate" placeholder="Closing Date" onChange={handleChange} />
        <textarea name="contingencies" placeholder="Contingencies (e.g., inspections, financing)" rows="2" onChange={handleChange} />
      </form>

      {/* Center the preview nicely */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div
          className="preview"
          style={{
            backgroundColor: "#ffffff",
            border: "6px solid #007BFF",
            padding: "25px",
            lineHeight: "1.7",
            textAlign: "left",
            width: "100%",
            maxWidth: "800px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px"
          }}
        >
          <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
            REAL ESTATE PURCHASE AGREEMENT
          </h3>
          <p>
            This Agreement ("Agreement") is made on the {formData.day} day of {formData.month}, {formData.year}, by and between <strong>{formData.sellerName}</strong>, a(n) {formData.sellerType}, and <strong>{formData.buyerName}</strong>, a(n) {formData.buyerType}.
          </p>
          <p>
            <strong>1. Property:</strong> {formData.propertyDescription}
          </p>
          <p>
            <strong>2. Personal Property Included:</strong> {formData.personalProperty || "None specified."}
          </p>
          <p>
            <strong>3. Purchase Price:</strong> ${formData.purchasePrice}
          </p>
          <p>
            <strong>4. Closing Date:</strong> {formData.closingDate}
          </p>
          <p>
            <strong>5. Contingencies:</strong> {formData.contingencies || "None."}
          </p>
          <p>
            <strong>6. Governing Law:</strong> This Agreement shall be governed by local property laws.
          </p>
          <p>
            <strong>7. Entire Agreement:</strong> This is the full and final agreement.
          </p>
          <p style={{ marginTop: "30px" }}>
            IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
          </p>
          <p>
            Seller: ___________________________ &nbsp;&nbsp;&nbsp;&nbsp; Buyer: ___________________________
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default LandPurchaseForm;
