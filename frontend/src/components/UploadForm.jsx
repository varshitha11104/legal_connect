// import React, { useState } from "react";
// import axios from "axios";

// function UploadForm() {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState("");
//   const [recommendation, setRecommendation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setSummary(res.data.summary);
//       setRecommendation(res.data.recommendations);
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? "Analyzing..." : "Upload"}
//       </button>

//       {summary && (
//         <div>
//           <h3>📝 Summary:</h3>
//           <p>{summary}</p>
//           <h3>✅ Recommendation:</h3>
//           <p>{recommendation}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadForm;

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
      const response = await fetch("http://localhost:8000/api/upload", {
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
