
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Home from './pages/Home'; 
import Blogs from './components/Blogs'; 
import Questionnaire from './components/publicQ&A/Questionnaire';
import './App.css';
import LegalDictionary from './pages/LegalDictionary';
import LegalEvents from './pages/LegalEvents';
import SignUpForm from './components/SignUpForm';
import UploadForm from "./components/UploadForm";
import LoginForm from "./components/LoginForm";
import ConnectPage from './components/User/ConnectPage';
import ConnectPageDetails from './components/User/ConnectPageDetails';
import MainPage from './components/User/MainPage';
import UserDashboard from './components/User/UserDashboard';
import LawyerDashboard from './components/Lawyer/LawyerDashboard';
import CompleteProfile from './components/Lawyer/CompleteProfile';
import CaseCategoryForm from './components/LegalTemplates/CaseCategoryForm';
import Profile from './components/User/ProfilePage';
import MyConsultations from "./components/Lawyer/MyConsultations";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
          <Route path="/signup" element={<SignUpForm />} />
            <Route path="/" element={<Home />} /> 
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/dictionary" element={<LegalDictionary />} />
            <Route path="/events" element={<LegalEvents />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path='/lawyer/:id/:name' element={<ConnectPage />}/>
            <Route path='/lawyerDetails/:id' element={<ConnectPageDetails />}/>
            <Route path='/main' element={<MainPage />}/>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
            <Route path="/lawyer/consultations" element={<MyConsultations />} />
            <Route path="/profile" element={<CompleteProfile />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/case-category" element={<CaseCategoryForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
