import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        fullName,
        email,
        password,
        role
      });

      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      setMessage('');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#1e90ff' }}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="user">User</option>
          <option value="lawyer">Lawyer</option>
        </select>
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
      <p>Already have account?    
      <Link to="/LoginForm" style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'underline' }}>
      Go to Login
      </Link></p>
      {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{error}</p>}
    </div>
  );
};

// Inline styles
const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#1e90ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default SignUpForm;
