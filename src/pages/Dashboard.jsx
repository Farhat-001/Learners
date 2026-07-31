import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';
import './Dashboard.css';

export default function Dashboard() {
  const [student, setStudent] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('student');
    if (!saved) { navigate('/login'); return; }
    setStudent(JSON.parse(saved));
  }, [navigate]);

  useEffect(() => {
    if (!student) return;
    const fetchMaterials = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('scheme', student.scheme)
        .eq('branch', student.branch);
      if (error) { console.error(error); setMaterials([]); }
      else setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, [student]);

  if (!student) return null;

  const isNew = (createdAt) => {
    const days = (Date.now() - new Date(createdAt)) / 86400000;
    return days <= 7;
  };

  return (
    <div className="page">
      <Navbar title="Student Dashboard" />

      <div className="card student-card">
        <h3>Welcome, {student.name}</h3>
        <p className="student-meta">
          PIN {student.pin_no} · {student.scheme} · {student.branch}
        </p>
      </div>

      <div className="materials-section">
        <h3 className="section-heading">Your Backlog Materials</h3>

{loading ? (
          <div className="loading-skeleton">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-item">
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
            ))}
          </div>
        ) : materials.length > 0 ? (
          <div className="materials-grid">
            {materials.map((file) => (
              <div key={file.id} className="card material-card">
                <div className="material-top">
                  <span className="material-title">{file.title}</span>
                  <span className={`chip ${isNew(file.created_at) ? 'chip-new' : 'chip-available'}`}>
                    {isNew(file.created_at) ? 'New' : 'Available'}
                  </span>
                </div>
                <a href={file.file_url} target="_blank" rel="noreferrer" className="btn btn-primary material-download">
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="card empty-state">
            <p>No backlog materials uploaded yet for {student.scheme} · {student.branch}.</p>
            <span className="muted">Check back after your department adds them.</span>
          </div>
        )}
      </div>
    </div>
  );
}