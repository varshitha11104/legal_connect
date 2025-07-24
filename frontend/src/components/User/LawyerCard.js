import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LawyerCard = ({ lawyer }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div style={styles.card}>
      <img src={lawyer.image} alt={lawyer.fullName} style={styles.image} />
      <h3>{lawyer.fullName}</h3>
      <p><strong>Qualification:</strong> {lawyer.qualification}</p>
      <p><strong>Cases:</strong> {lawyer.totalCases}</p>

      {showMore && (
        <div>
          <p><strong>Specialization:</strong> {lawyer.qualification}</p>
          <p><strong>Winning Cases:</strong> {lawyer.winningCases}</p>
          <p><strong>Fees:</strong> ₹{lawyer.fees}</p>
          <p><strong>Description:</strong> {lawyer.bio}</p>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <button onClick={toggleReadMore} style={styles.readMoreBtn}>
          {showMore ? 'Show Less' : 'Read More'}
        </button>

        <Link to={`/lawyer/${lawyer.id}/${lawyer.fullName}`}>
          <button style={{ ...styles.readMoreBtn, backgroundColor: '#20B2AA', color: 'white' }}>
            Connect
          </button>
        </Link>

      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '250px',
    margin: '15px',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  readMoreBtn: {
    margin: '5px',
    padding: '8px 14px',
    border: 'none',
    backgroundColor: '#ccc',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  connectBtn: {
    margin: '5px',
    padding: '8px 14px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default LawyerCard;
