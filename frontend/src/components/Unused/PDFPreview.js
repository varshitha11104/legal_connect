import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFPreview = ({ data }) => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('case-details.pdf');
    });
  };

  return (
    <div>
      <div ref={pdfRef} className="bg-white p-6 shadow-lg max-w-xl mx-auto my-6">
        <h2 className="text-xl font-bold mb-2">User Case Details</h2>
        <p><strong>Full Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>Case Title:</strong> {data.caseTitle}</p>
        <p><strong>Case Description:</strong> {data.caseDescription}</p>
        <p><strong>Case Category:</strong> {data.caseCategory}</p>
      </div>
      <div className="text-center">
        <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded shadow">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PDFPreview;
