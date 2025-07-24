// src/components/DivorcePDF.js
import React from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import DivorceAgreementPDF from "./DivorceAgreementPDF"; // PDF layout file

export const DivorcePDF = ({ formData }) => {
  const handleDownload = async () => {
    const blob = await pdf(<DivorceAgreementPDF data={formData} />).toBlob();
    saveAs(blob, "Divorce_Settlement_Agreement.pdf");
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Preview</h2>
      <div className="border p-4 bg-gray-50 mb-4">
        <DivorceAgreementPDF data={formData} preview />
      </div>
      <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">Download PDF</button>
    </div>
  );
};
