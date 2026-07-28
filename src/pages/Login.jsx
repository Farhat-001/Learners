import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [role, setRole] = useState('student');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (role === 'student') {
      const { data, error: lookupError } = await supabase
        .from('students')
        .select('*')
        .eq('pin', pin)
        .single();

      if (lookupError || !data) {
        setError('Invalid PIN number.');
        return;
      }

      // Remember this student on this browser
      localStorage.setItem('student', JSON.stringify(data));
      navigate('/dashboard');
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Invalid admin credentials.');
    } else {
      navigate('/admin');
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
            <label style={{ display: 'block', marginBottom: '5px' }}><strong>Login As:</strong></label>
            <select value={role} style={{ width: '100%', padding: '10px' }} onChange={e => setRole(e.target.value)}>
              <option value="student">Student (check backlog status)</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {role === 'student' && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}><strong>PIN Number:</strong></label>
              <input type="text" required style={{ width: '100%', padding: '10px' }} value={pin} onChange={e => setPin(e.target.value)} />
            </div>
          )}

          {role === 'admin' && (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}><strong>Email:</strong></label>
                <input type="email" required style={{ width: '100%', padding: '10px' }} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}><strong>Password:</strong></label>
                <input type="password" required style={{ width: '100%', padding: '10px' }} onChange={e => setPassword(e.target.value)} />
              </div>
            </>
          )}

          <button type="submit" style={{ backgroundColor: '#003366', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {role === 'admin' ? 'Sign In' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}