// export default Home;
import React from 'react';
import '../css/Home.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="top-section">
        <h1 className="main-title">Legal Connect</h1>
        <p className="subtitle">
          A one-stop legal platform for document analysis, legal resources, and more.
        </p>
      </div>

      <div className="features-container">
        <div className="feature-box">
          <div className="feature-icon">📄</div>
          <h3 className="feature-title">DOCUMENT ANALYSIS</h3>
          <p className="feature-description">
            Upload legal documents to get summarized insights and key points extracted.
          </p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">LEGAL TEMPLATES</h3>
          <p className="feature-description">
            Download professionally designed templates like NDAs, contracts, and more.
          </p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">👨‍⚖️</div>
          <h3 className="feature-title">CONNECT WITH LAWYERS</h3>
          <p className="feature-description">
            Empower legal professionals to showcase their expertise and connect with clients.
          </p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">📰</div>
          <h3 className="feature-title">READING BLOGS</h3>
          <p className="feature-description">
            Discover case studies and legal blogs for better legal awareness.
          </p>
        </div>
      </div>
<div id="about" style={{ padding: '40px 20px', backgroundColor: '#e9ecef' , textAlign: 'center' }}>
  <h2>About Us</h2>
  <p style={{ maxWidth: '600px', margin: 'auto' }}>
    Legal Connect is a comprehensive legal platform that simplifies access to legal resources, document analysis,
    and lawyer-client engagement.
  </p>
</div>

<div id="contact" style={{ padding: '40px 20px', backgroundColor: '#e9ecef', textAlign: 'center' }}>
  <h2>Contact Us</h2>
  <p>Email: support@legalconnect.com</p>
  <p>Phone: +91 9876543210</p>
  <p>Address: 123 Legal Street, Law City, India</p>
</div>

    </div>
  );
};

export default HomePage;
