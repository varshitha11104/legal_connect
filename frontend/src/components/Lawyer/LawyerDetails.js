import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lawyers from '../../data/lawyers';

const LawyerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lawyer = lawyers.find((lawyer) => lawyer.id === parseInt(id) || lawyer.id === id);

  if (!lawyer) {
    return <div style={{ padding: '2rem', fontSize: '18px' }}>Lawyer not found</div>;
  }

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #A6D6D6, #8E7DBE)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '600px',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.2)'
      }}>
        <img src={lawyer.image} alt={lawyer.name} style={{ width: '100%', borderRadius: '12px' }} />
        <h2>{lawyer.name}</h2>
        <p><strong>Qualification:</strong> {lawyer.qualification}</p>
        <p><strong>Experience:</strong> {lawyer.experience}</p>
        <p><strong>Cases:</strong> {lawyer.cases}</p>
        <p><strong>Specialization:</strong> {lawyer.specialization}</p>
        <p><strong>Winning Cases:</strong> {lawyer.winningCases}</p>
        <p><strong>Fees:</strong> ₹{lawyer.fees}</p>
        <p><strong>Description:</strong> {lawyer.description}</p>

        <button
          onClick={() => navigate('/main')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#6a5acd',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LawyerDetails;
