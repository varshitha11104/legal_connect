import React, { useState } from 'react';
import jsPDF from 'jspdf';

const CriminalForm = ({onSelectCategory}) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    contact: '',
    incidentDate: '',
    incidentTime: '',
    charges: '',
    policeStation: '',
    policeInvolved: '',
    incidentBrief: '',
    additionalDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('Times', 'Roman');
    doc.setFontSize(14);

    doc.text('Criminal Case Statement', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`I, ${formData.name}, aged ${formData.age}, residing at ${formData.address},`, 20, 40);
    doc.text(`am submitting this formal statement regarding a criminal incident that occurred on ${formData.incidentDate} at ${formData.incidentTime}.`, 20, 50);
    doc.text(`The incident involved the following charges: ${formData.charges || '__________'}.`, 20, 60);
    doc.text(`Police involvement: ${formData.policeInvolved || '_____'}.`, 20, 70);
    doc.text(`Police Station (if applicable): ${formData.policeStation || '__________'}.`, 20, 80);
    doc.text(`Brief description: ${formData.incidentBrief || '________________________'}`, 20, 90);
    doc.text(`Additional details: ${formData.additionalDetails || '________________________'}`, 20, 100);
    doc.text(`I am providing this information truthfully and in good faith to seek appropriate legal help.`, 20, 110);
    doc.text(`I am reachable at: ${formData.contact}`, 20, 120);
    doc.text('Signed: ____________________', 20, 140);

    doc.save('criminal_case_statement.pdf');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F9FAFB' }}>
      <button
            className="primary"
            onClick={() => onSelectCategory("")}
          >BACK</button>
      <h2>Criminal Case Information</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="age" placeholder="Age" onChange={handleChange} />
        <input name="incidentTime" placeholder="Time of Incident" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="contact" placeholder="Contact Details" onChange={handleChange} />
        <input name="incidentDate" placeholder="Date of Incident" onChange={handleChange} />
        <input name="charges" placeholder="Nature of Charges (e.g., theft, assault)" onChange={handleChange} />
        <input name="policeStation" placeholder="Police Station (if applicable)" onChange={handleChange} />
        <select name="policeInvolved" onChange={handleChange} defaultValue="">
          <option value="">Is police involved?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <textarea name="incidentBrief" placeholder="Brief Statement of the Incident" onChange={handleChange}></textarea>
        <textarea name="additionalDetails" placeholder="Additional Details (if any)" onChange={handleChange}></textarea>
      </div>

      <h3 style={{ marginTop: '40px' }}>Preview</h3>

      <div style={{
        border: '6px solid #007BFF',
        padding: '40px',
        marginTop: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        textAlign: 'center',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Georgia, serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ textDecoration: 'underline', marginBottom: '20px' }}>Criminal Case Statement</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
          I, <strong>{formData.name}</strong>, aged <strong>{formData.age}</strong>, residing at <strong>{formData.address}</strong>,
          am submitting this formal statement regarding a criminal incident that occurred on <strong>{formData.incidentDate}</strong> at <strong>{formData.incidentTime}</strong>.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
          The incident involved the following charges: <strong>{formData.charges || "_________"}</strong>.
          It is important to note that police involvement is marked as: <strong>{formData.policeInvolved || "_____"}</strong>.
          If applicable, the police station handling the case is: <strong>{formData.policeStation || "_________"}</strong>.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
          A brief description of the incident: <em>{formData.incidentBrief || "________________________"}</em>.
          Additional details provided: <em>{formData.additionalDetails || "________________________"}</em>.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
          I am providing this information truthfully and in good faith, with the intention to seek appropriate legal help.
          I am reachable at: <strong>{formData.contact}</strong>.
        </p>
        <p style={{ fontSize: '18px', marginTop: '30px' }}>
          Signed: ____________________
        </p>
      </div>

      <button onClick={generatePDF} style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Download PDF
      </button>
    </div>
  );
};

export default CriminalForm;
