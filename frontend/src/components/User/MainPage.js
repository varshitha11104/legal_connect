// import LawyerCard from './LawyerCard';
// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import '../../css/MainPage.css';

// const MainPage = () => {

//   const [lawyers, setLawyers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/all-lawyers`);
//         setLawyers(response.data); // Set the lawyers data in the state
//         setLoading(false); // Stop loading

//       } catch (err) {
//         setError("Failed to fetch lawyers");
//         setLoading(false); // Stop loading even if there is an error
//       }
//     };

//     fetchLawyers();
//   }, []);

//   if (loading) return <p>Loading lawyers...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="main-container">
//       <h1 className="title">Available Lawyers</h1>
//       <div className="lawyer-grid">
//         {lawyers.map((lawyer, index) => (
//           <LawyerCard key={index} lawyer={lawyer} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainPage;

import React, { useEffect, useState } from 'react';
import axios from "axios";
import LawyerCard from './LawyerCard';
import '../../css/MainPage.css';

const MainPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const endpoint = `${baseUrl}/api/all-lawyers`;

      if (!baseUrl) {
        setError("API base URL not defined");
        console.error("REACT_APP_API_BASE_URL is missing in environment");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(endpoint);

        if (Array.isArray(response.data)) {
          setLawyers(response.data);
        } else {
          console.warn("Expected an array but got:", response.data);
          setLawyers([]);
        }

      } catch (err) {
        console.error("Error fetching lawyers:", err);
        setError("Failed to fetch lawyers");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  if (loading) return <p>Loading lawyers...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="main-container">
      <h1 className="title">Available Lawyers</h1>
      <div className="lawyer-grid">
        {lawyers.length === 0 ? (
          <p>No lawyers found.</p>
        ) : (
          lawyers.map((lawyer, index) => (
            <LawyerCard key={index} lawyer={lawyer} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
