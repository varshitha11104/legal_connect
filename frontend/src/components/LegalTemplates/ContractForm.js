import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../css/ContractForm.css';

const ContractForm = ({onSelectCategory}) => {
  const [formData, setFormData] = useState({
    effectiveDate: '',
    partyA: '',
    addressA: '',
    partyB: '',
    addressB: '',
    contractPurpose: '',
    governingLaw: ''
  });

  const contractRef = useRef(null); // 👉 Reference to the contract section

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const display = (value, placeholder) =>
    value.trim() !== '' ? value : placeholder;

  // 📄 Function to download contract section as PDF
  const handleDownloadPDF = async () => {
    const element = contractRef.current;
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('contract-agreement.pdf');
  };

  return (

    <div className="contract-container">
      <button
            className="primary"
            onClick={() => onSelectCategory("")}
          >BACK</button>
      <h2>Contract Agreement Form</h2>
      <form className="contract-form">
        <input type="date" name="effectiveDate" placeholder="Effective Date" onChange={handleChange} />
        <input type="text" name="partyA" placeholder="Party A Name" onChange={handleChange} />
        <input type="text" name="addressA" placeholder="Party A Address" onChange={handleChange} />
        <input type="text" name="partyB" placeholder="Party B Name" onChange={handleChange} />
        <input type="text" name="addressB" placeholder="Party B Address" onChange={handleChange} />
        <input type="text" name="contractPurpose" placeholder="Purpose of Contract" onChange={handleChange} />
        <input type="text" name="governingLaw" placeholder="Governing Law" onChange={handleChange} />
      </form>

      {/* 📎 This is the contract preview section to be printed */}
      <div className="contract-preview" ref={contractRef}>
        <div className="contract-border">
          <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>CONTRACT AGREEMENT</h2>
          <p>
            This Contract Agreement (the “Agreement”) is made and entered into on <strong>{display(formData.effectiveDate, '[Effective Date]')}</strong>,
            by and between <strong>{display(formData.partyA, '[Party A]')}</strong>, located at <strong>{display(formData.addressA, '[Address A]')}</strong> (hereinafter referred to as “Party A”),
            and <strong>{display(formData.partyB, '[Party B]')}</strong>, located at <strong>{display(formData.addressB, '[Address B]')}</strong> (hereinafter referred to as “Party B”).
          </p>
          <p>
            WHEREAS, the Parties desire to enter into this Agreement for the purpose of <strong>{display(formData.contractPurpose, '[Contract Purpose]')}</strong>;
          </p>
          <p>
            NOW, THEREFORE, in consideration of the mutual covenants and promises set forth herein, the Parties agree as follows:
          </p>
          <ol>
            <li><strong>Obligations:</strong> Each party agrees to fulfill their respective obligations in accordance with the terms of this Agreement.</li>
            <li><strong>Term:</strong> This Agreement shall commence on the Effective Date and remain in effect unless terminated by either party with proper notice.</li>
            <li><strong>Governing Law:</strong> This Agreement shall be governed by and construed in accordance with the laws of <strong>{display(formData.governingLaw, '[Governing Law]')}</strong>.</li>
            <li><strong>Severability:</strong> If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</li>
          </ol>
          <p>IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.</p>
          <br />
          <p>_________________________<br />{display(formData.partyA, '[Party A]')}</p>
          <br />
          <p>_________________________<br />{display(formData.partyB, '[Party B]')}</p>
        </div>
      </div>

      {/* 📤 Button to download only the contract preview section */}
      <button onClick={handleDownloadPDF} className="download-button">
        Download / Print Contract Only
      </button>
    </div>
  );
};

export default ContractForm;
