import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [student, setStudent] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('student');
    if (!saved) {
      navigate('/login');
      return;
    }
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

      if (error) {
        console.error('Error fetching materials:', error);
        setMaterials([]);
      } else {
        setMaterials(data);
      }
      setLoading(false);
    };

    fetchMaterials();
  }, [student]);

  if (!student) return null;

  return (
    <div style={{ padding: '0 2rem' }}>
      <Navbar title="Student Dashboard" />

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
        <h3>Welcome, {student.name}</h3>
        <p style={{ color: '#666' }}>PIN: {student.pin_no} &nbsp;|&nbsp; Scheme: {student.scheme} &nbsp;|&nbsp; Branch: {student.branch}</p>
      </div>

      <div style={{ marginTop: '2rem', padding: '20px', border: '1px solid #b3d7ff', borderRadius: '8px', backgroundColor: '#f0f7ff' }}>
        <h3 style={{ color: '#003366', marginTop: 0 }}>📚 Your Backlog Materials</h3>

        {loading ? (
          <p style={{ color: '#666' }}>Loading materials...</p>
        ) : materials.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {materials.map((file) => (
              <li key={file.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                <div>
                  <span style={{ fontSize: '16px', color: '#333' }}>📄 {file.title}</span>
                </div>
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', textDecoration: 'none' }}
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#666' }}>No specific backlog materials uploaded yet for this combination.</p>
        )}
      </div>
    </div>
  );
}