import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/LoginForm', label: 'Login' },
    { to: '/signup', label: 'Sign Up' },
    
  ];

  // User dashboard links
  const userLinks = [
    { to: '/user-dashboard', label: 'Dashboard' },
    { to: '/main', label: 'Connect Lawyers' },
    { to: '/upload', label: 'Analyze Docs' },
    { to: '/case-category', label: 'LegalTemplates' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/user-profile', label: 'My Profile' },
  ];

  // Lawyer dashboard links
  const lawyerLinks = [
    { to: '/lawyer-dashboard', label: 'Dashboard' },
    { to: '/lawyer/consultations', label: 'My Consultations' },
    { to: '/upload', label: 'Analyze Docs' },
    { to: '/case-category', label: 'LegalTemplates' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/profile', label: 'My Profile' },
  ];

  // Choose which set to render
  let linksToRender = publicLinks;
  if (token && role === 'user')   linksToRender = userLinks;
  if (token && role === 'lawyer') linksToRender = lawyerLinks;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Legal Connect</Link>
      </div>

      <ul className="navbar-links">
        {linksToRender.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}

        {token && (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
