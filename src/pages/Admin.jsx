import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Admin() {
  const [students, setStudents] = useState([
    { id: 1, name: 'K. Sai Ram', pin: '21094-CM-015', branch: 'CME', scheme: 'C-20', backlogs: 3 },
    { id: 2, name: 'P. Harika', pin: '21094-EC-042', branch: 'ECE', scheme: 'C-20', backlogs: 1 },
    { id: 3, name: 'T. Vamsi Krishna', pin: '20094-EE-005', branch: 'EEE', scheme: 'C-16', backlogs: 4 }
  ]);

  const [form, setForm] = useState({ name: '', pin: '', branch: 'CME', scheme: 'C-20', backlogs: '' });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const record = {
      id: Date.now(),
      name: form.name,
      pin: form.pin.toUpperCase(),
      branch: form.branch,
      scheme: form.scheme,
      backlogs: parseInt(form.backlogs) || 0
    };
    setStudents([...students, record]);
    setForm({ name: '', pin: '', branch: 'CME', scheme: 'C-20', backlogs: '' });
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div style={{ padding: '0 2rem' }}>
      <Navbar title="Administrator Control Console" />
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Registration Form Panel */}
        <div style={{ flex: '1', minWidth: '300px', background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3 style={{ color: '#003366', marginTop: 0 }}>📋 Create Student Backlog Record</h3>
          <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>Full Name:</label>
              <input type="text" value={form.name} required style={{ width: '100%', padding: '8px' }} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>SBTET Hallticket PIN:</label>
              <input type="text" value={form.pin} placeholder="e.g., 21094-CM-001" required style={{ width: '100%', padding: '8px' }} onChange={e => setForm({...form, pin: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px' }}>Branch:</label>
                <select value={form.branch} style={{ width: '100%', padding: '8px' }} onChange={e => setForm({...form, branch: e.target.value})}>
                  <option value="CME">CME</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px' }}>Scheme:</label>
                <select value={form.scheme} style={{ width: '100%', padding: '8px' }} onChange={e => setForm({...form, scheme: e.target.value})}>
                  <option value="C-20">C-20</option>
                  <option value="C-16">C-16</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>Number of Active Backlogs:</label>
              <input type="number" min="0" value={form.backlogs} required style={{ width: '100%', padding: '8px' }} onChange={e => setForm({...form, backlogs: e.target.value})} />
            </div>
            <button type="submit" style={{ backgroundColor: '#003366', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Save to Local Database
            </button>
          </form>
        </div>

        {/* Database Grid Table Output */}
        <div style={{ flex: '2', minWidth: '500px' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>📊 Live Student Database Logs</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#003366', color: 'white' }}>
                <th style={{ padding: '12px' }}>Student PIN</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Branch</th>
                <th style={{ padding: '12px' }}>Scheme</th>
                <th style={{ padding: '12px' }}>Count</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}><strong>{student.pin}</strong></td>
                  <td style={{ padding: '12px' }}>{student.name}</td>
                  <td style={{ padding: '12px' }}>{student.branch}</td>
                  <td style={{ padding: '12px' }}>{student.scheme}</td>
                  <td style={{ padding: '12px' }}><span style={{ color: 'red', fontWeight: 'bold' }}>{student.backlogs}</span></td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => deleteStudent(student.id)}
                      style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
