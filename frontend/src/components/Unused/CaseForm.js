import React, { useState } from 'react';
import PDFPreview from '../PDFPreview';

const CaseForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    caseTitle: '',
    caseDescription: '',
    caseCategory: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="p-4">
    
      {!submittedData ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded">
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border" />
          <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border" />
          <input name="city" placeholder="City" onChange={handleChange} required className="w-full p-2 border" />
          <input name="caseTitle" placeholder="Case Title" onChange={handleChange} required className="w-full p-2 border" />
          <textarea name="caseDescription" placeholder="Case Description" onChange={handleChange} required className="w-full p-2 border" />
          <select name="caseCategory" onChange={handleChange} required className="w-full p-2 border">
            <option value="">Select Case Category</option>
            <option value="Divorce">Divorce</option>
            <option value="Property">Property / Real Estate</option>
            <option value="Criminal">Criminal</option>
            <option value="Employment">Employment / Workplace</option>
            <option value="Consumer">Consumer Rights</option>
            <option value="Contract">Contract Dispute</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Generate PDF</button>
        </form>
      ) : (
        <PDFPreview data={submittedData} />
      )}
    </div>
  );
};

export default CaseForm;
