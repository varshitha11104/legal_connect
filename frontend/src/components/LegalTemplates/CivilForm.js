import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CivilForm = ({ onSelectCategory }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    date: '',
    plaintiff: '',
    defendant: '',
    caseNumber: '',
    documents: '',
    isFirstVisit: 'yes',
    advocateName: '',
    advocateFirm: '',
    signed: ''
  });

  const previewRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = () => {
    html2canvas(previewRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('CivilAcknowledgment.pdf');
    });
  };

  return (
    
    <div style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}>
       <button
            className="primary"
            onClick={() => onSelectCategory("")}
          >BACK</button>
      <h2 style={{ marginBottom: '1rem' }}>Civil Case Details</h2>
      <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 600 }}>
        <input name="fullName" placeholder="Your Full Name" onChange={handleChange} />
        <input name="address" placeholder="Your Address" onChange={handleChange} />
        <input name="date" type="date" placeholder="Date" onChange={handleChange} />
        <input name="plaintiff" placeholder="Plaintiff Name" onChange={handleChange} />
        <input name="defendant" placeholder="Defendant Name" onChange={handleChange} />
        <input name="caseNumber" placeholder="Case Number" onChange={handleChange} />
        <input name="documents" placeholder="Documents Received" onChange={handleChange} />
        <label>Is this your first visit to a lawyer?</label>
        <select name="isFirstVisit" onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {formData.isFirstVisit === 'no' && (
          <>
            <input name="advocateName" placeholder="Advocate's Name" onChange={handleChange} />
            <input name="advocateFirm" placeholder="Advocate's Firm Name" onChange={handleChange} />
          </>
        )}
        <input name="signed" placeholder="Your Name for Signature" onChange={handleChange} />
      </div>

      <h3 style={{ marginTop: '2rem' }}>Preview</h3>
      <div
        ref={previewRef}
        style={{
          border: '5px solid #0000FF',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '800px',
          margin: '2rem auto',
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        <h2 style={{ textDecoration: 'underline' }}>Notice and Acknowledgment</h2>
        <p>
          <strong>Plaintiff:</strong> {formData.plaintiff}<br />
          <strong>vs.</strong><br />
          <strong>Defendant:</strong> {formData.defendant}<br />
          <strong>Case Number:</strong> {formData.caseNumber}
        </p>

        <p style={{ marginTop: '1.5rem' }}>
          This document serves as a formal acknowledgment by <strong>{formData.fullName}</strong>,
          currently residing at <strong>{formData.address}</strong>, that they have received all
          pertinent legal documents related to the case mentioned above, as filed on <strong>{formData.date}</strong>.
        </p>

        {formData.isFirstVisit === 'yes' ? (
          <p>
            The recipient confirms that this is their initial consultation with legal counsel
            regarding the matter. The received documents have been carefully reviewed and
            discussed in the presence of qualified legal representatives to ensure complete
            understanding.
          </p>
        ) : (
          <p>
            The recipient confirms they have previously consulted <strong>{formData.advocateName}</strong> from
            <strong> {formData.advocateFirm}</strong>. The documents received in the current instance
            are a continuation or follow-up to prior legal consultations.
          </p>
        )}

        <p>
          This acknowledgment is being made in good faith, with the understanding that further legal
          proceedings may follow based on the documents provided.
        </p>

        <p><strong>Documents Received:</strong> {formData.documents}</p>

        <p style={{ marginTop: '2rem' }}>
          Signed: ___________________________ <br />
          <strong>{formData.signed}</strong><br />
          Date: ________________
        </p>
      </div>

      <button onClick={handleDownload} style={{
        marginLeft: '2rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3F00FF',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Download PDF
      </button>
    </div>
  );
};

export default CivilForm;
