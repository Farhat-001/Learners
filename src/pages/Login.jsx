import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Login.css';

export default function Login() {
  const [role, setRole] = useState('student');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (role === 'student') {
      const { data, error: lookupError } = await supabase
        .from('students')
        .select('*')
        .eq('pin', pin)
        .single();

      if (lookupError || !data) {
        setError('Invalid PIN number.');
        setSubmitting(false);
        return;
      }

      localStorage.setItem('student', JSON.stringify(data));
      navigate('/dashboard');
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Invalid admin credentials.');
      setSubmitting(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-orb-2" />
      <div className="card login-card">
        <div className="login-logo">LP</div>
        <h2 className="login-title">AANM &amp; VVRSR</h2>
        <p className="login-subtitle">Polytechnic Backlog Portal</p>

        <div className="role-toggle">
          <button
            type="button"
            className={`role-btn ${role === 'student' ? 'role-btn-active' : ''}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`role-btn ${role === 'admin' ? 'role-btn-active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Administrator
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin} className="form-stack">
          {role === 'student' && (
            <div>
              <label className="field-label">PIN Number</label>
              <input
                type="text"
                required
                autoFocus
                className="field-input pin-input"
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="••••"
              />
            </div>
          )}

          {role === 'admin' && (
            <>
              <div>
                <label className="field-label">Email</label>
                <input type="email" required className="field-input" onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input type="password" required className="field-input" onChange={e => setPassword(e.target.value)} />
              </div>
            </>
          )}

          <button type="submit" disabled={submitting} className="btn btn-primary login-submit">
            {submitting ? 'Please wait…' : role === 'admin' ? 'Sign In' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}