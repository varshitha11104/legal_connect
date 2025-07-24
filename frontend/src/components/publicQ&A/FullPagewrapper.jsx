// src/components/FullPageWrapper.jsx
import React from 'react';

const FullPageWrapper = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional for readability
      backdropFilter: 'blur(3px)', // Optional for blur effect
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  );
};

export default FullPageWrapper;
