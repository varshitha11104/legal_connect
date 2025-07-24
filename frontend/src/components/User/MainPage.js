import LawyerCard from './LawyerCard';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../css/MainPage.css';

const MainPage = () => {

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all-lawyers");
        setLawyers(response.data); // Set the lawyers data in the state
        setLoading(false); // Stop loading

      } catch (err) {
        setError("Failed to fetch lawyers");
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchLawyers();
  }, []);

  if (loading) return <p>Loading lawyers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-container">
      <h1 className="title">Available Lawyers</h1>
      <div className="lawyer-grid">
        {lawyers.map((lawyer, index) => (
          <LawyerCard key={index} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

