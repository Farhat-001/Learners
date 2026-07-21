import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ pin: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Basic routing validation rules
    if (credentials.role === 'admin') {
      if (credentials.pin.toLowerCase() === 'admin' && credentials.password === 'admin123') {
        navigate('/admin');
      } else {
        setError('Invalid Admin Credentials! (Use pin: admin, pass: admin123)');
      }
    } else {
      if (credentials.pin.trim() === '' || credentials.password.trim() === '') {
        setError('Please enter your PIN and password.');
      } else {
        // Directs valid student formats straight to materials dashboard
        navigate('/dashboard');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ padding: '2.5rem', maxWidth: '400px', width: '100%', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#003366', marginBottom: '5px' }}>AANM & VVRSR</h2>
        <h4 style={{ textAlign: 'center', color: '#666', marginTop: '0', marginBottom: '20px' }}>Polytechnic Backlog Portal</h4>
        
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}><strong>PIN / Username:</strong></label>
            <input 
              type="text" 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
              placeholder="e.g., 21094-CM-001 or admin"
              onChange={e => setCredentials({...credentials, pin: e.target.value})} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}><strong>Password:</strong></label>
            <input 
              type="password" 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
              placeholder="••••••••"
              onChange={e => setCredentials({...credentials, password: e.target.value})} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}><strong>Login As:</strong></label>
            <select 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              onChange={e => setCredentials({...credentials, role: e.target.value})}
            >
              <option value="student">Student Explorer</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>
          
          <button type="submit" style={{ backgroundColor: '#003366', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
            Access Account
          </button>
        </form>
      </div>
    </div>
  );
}
