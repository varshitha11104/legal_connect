

import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false); 
  const [buttonText, setButtonText] = useState("Analyze"); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsAnalyzing(true); // Set analyzing state to true
    setButtonText("Analyzing..."); // Change button text to "Analyzing..."

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/uploa`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary || "No summary returned.");
    } catch (error) {
      console.error("Error:", error);
      setSummary("An error occurred while processing the document.");
    }

    setIsAnalyzing(false); 
    setButtonText("Analyze"); 
  };

  return (
    <div>
      <h2>Upload Legal Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={isAnalyzing}>
          {buttonText}
        </button>
      </form>
      <h3>Summary:</h3>
      <p>{summary}</p>
    </div>
  );
};

export default UploadForm;
