import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navbar({ title }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    localStorage.removeItem('student');
    navigate('/login');
  };
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#003366',
      color: 'white',
      padding: '1rem 2rem',
      marginBottom: '2rem',
      borderRadius: '4px'
    }}>
      <h2 style={{ margin: 0 }}>Learners Portal - AANM & VVRSR</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span><strong>Role:</strong> {title}</span>
        <button 
          onClick={handleLogout} 
          style={{ backgroundColor: '#cc0000', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
