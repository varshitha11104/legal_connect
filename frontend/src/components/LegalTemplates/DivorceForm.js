import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DivorceForm = ({onSelectCategory}) => {
  const [formData, setFormData] = useState({
    effectiveDate: "",
    petitionerName: "",
    petitionerAddress: "",
    respondentName: "",
    respondentAddress: "",
    marriageDate: "",
    marriageCity: "",
    marriageCounty: "",
    marriageState: "",
    children: [{ name: "", dob: "" }],
  });

  const handleChange = (e, index = null) => {
    if (e.target.name === "name" || e.target.name === "dob") {
      const updatedChildren = [...formData.children];
      updatedChildren[index][e.target.name] = e.target.value;
      setFormData({ ...formData, children: updatedChildren });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { name: "", dob: "" }],
    });
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("divorce_settlement_agreement.pdf");
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button
            className="primary"
            onClick={() => onSelectCategory("")}
          >BACK</button>
      <h2>Divorce Settlement Agreement</h2>

      {/* Input Form */}
      <label>Effective Date: </label>
      <input type="date" name="effectiveDate" onChange={handleChange} /><br /><br />

      <label>Petitioner Name: </label>
      <input name="petitionerName" onChange={handleChange} /><br />
      <label>Petitioner Address: </label>
      <input name="petitionerAddress" onChange={handleChange} /><br /><br />

      <label>Respondent Name: </label>
      <input name="respondentName" onChange={handleChange} /><br />
      <label>Respondent Address: </label>
      <input name="respondentAddress" onChange={handleChange} /><br /><br />

      <label>Marriage Date: </label>
      <input type="date" name="marriageDate" onChange={handleChange} /><br />
      <label>City: </label>
      <input name="marriageCity" onChange={handleChange} />
      <label> County: </label>
      <input name="marriageCounty" onChange={handleChange} />
      <label> State: </label>
      <input name="marriageState" onChange={handleChange} /><br /><br />

      <h4>Minor Children</h4>
      {formData.children.map((child, index) => (
        <div key={index}>
          <input
            placeholder="Child Name"
            name="name"
            value={child.name}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            placeholder="Date of Birth"
            type="date"
            name="dob"
            value={child.dob}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button onClick={addChild}>+ Add Child</button><br /><br />

      {/* Live Agreement Preview */}
      <div
        id="pdf-content"
        style={{
          border: "6px solid #007BFF",
          padding: "30px",
          marginTop: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
          backgroundColor: "#fff",
        }}
      >
        <h1 style={{ textAlign: "center" }}>DIVORCE SETTLEMENT AGREEMENT</h1>

        <h3>INTRODUCTORY PROVISIONS</h3>

        <p><strong>1. Effective Date</strong><br />
          This agreement is made and entered into this day of <strong>{formData.effectiveDate}</strong> (the “Effective Date”).
        </p>

        <p><strong>2. The Parties</strong><br />
          <strong>{formData.petitionerName}</strong>, residing at <strong>{formData.petitionerAddress}</strong> (hereinafter, the “Petitioner”).<br />
          <strong>{formData.respondentName}</strong>, residing at <strong>{formData.respondentAddress}</strong> (hereinafter, the “Respondent”).
        </p>

        <p><strong>3. Marriage Date</strong><br />
          The Petitioner and the Respondent were lawfully married on <strong>{formData.marriageDate}</strong>, in <strong>{formData.marriageCity}</strong>, County of <strong>{formData.marriageCounty}</strong>, <strong>{formData.marriageState}</strong>.
        </p>

        <p><strong>4. Minor Children of the Marriage</strong><br />
          {formData.children.length === 0
            ? "No children were born or adopted during the marriage."
            : (
              <>
                The following minor child(ren) are of the marriage:
                <ul>
                  {formData.children.map((child, index) => (
                    <li key={index}>
                      {child.name}, born on {child.dob}
                    </li>
                  ))}
                </ul>
              </>
            )}
        </p>

        <p><strong>5. Property and Assets</strong><br />
          Both parties agree to divide marital property fairly and equitably. Specific property allocation will be documented in an appendix.
        </p>

        <p><strong>6. Spousal Support</strong><br />
          The parties agree that spousal support <i>(if any)</i> will be mutually discussed and legally confirmed if applicable.
        </p>

        <p><strong>7. Final Agreement</strong><br />
          This Agreement represents the complete understanding between the parties.
        </p>
      </div>

      <button onClick={generatePDF} style={{ marginTop: "20px" }}>
        Download Agreement PDF
      </button>
    </div>
  );
};

export default DivorceForm;
