import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Navbar.css';

export default function Navbar({ title }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    localStorage.removeItem('student');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">LP</span>
        <div>
          <h2 className="navbar-title">Learners Portal</h2>
          <span className="navbar-subtitle">AANM &amp; VVRSR Polytechnic</span>
        </div>
      </div>

      <div className="navbar-actions">
        <span className="navbar-role">{title}</span>
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}