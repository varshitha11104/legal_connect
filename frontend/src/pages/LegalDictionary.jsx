import React, { useState } from 'react';
import legalTerms from '../data/legalTerms_large.json'; 
import '../css/LegalDictionary.css'; 

const LegalDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = legalTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dictionary-container">
      <h1>Legal Dictionary</h1>
      <input
        type="text"
        placeholder="Search for a legal term..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="terms-list">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, index) => (
            <div className="term-card" key={index}>
              <h2>{item.term}</h2>
              <p>{item.definition}</p>
            </div>
          ))
        ) : (
          <p className="no-result">No matching terms found.</p>
        )}
      </div>
    </div>
  );
};

export default LegalDictionary;
