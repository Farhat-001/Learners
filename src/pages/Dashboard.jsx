import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [scheme, setScheme] = useState('');
  const [branch, setBranch] = useState('');
  
  // Realistically structured dataset mapping schemes and engineering branches
  const materialsDatabase = {
    'C-23': {
      'CME': [
        { name: 'Data Structures through C (CM-302) Notes.pdf', size: '4.2 MB' },
        { name: 'DBMS Previous Year Mid & End Exam Papers.pdf', size: '2.8 MB' },
        { name: 'Digital Electronics Key Definitions.pdf', size: '1.5 MB' }
      ],
      'ECE': [
        { name: 'Electronic Devices & Circuits (EC-302) Guide.pdf', size: '5.1 MB' },
        { name: 'Network Theory Solved Question Bank.pdf', size: '3.9 MB' }
      ],
      'EEE': [
        { name: 'Electrical Circuits Textbook Solution Blueprint.pdf', size: '6.0 MB' },
        { name: 'DC Machines & Alternators Important Questions.pdf', size: '3.2 MB' }
      ]
    },
    'C-20': {
      'CME': [
        { name: 'C-16 Java Programming Core Concepts.pdf', size: '3.7 MB' },
        { name: 'Operating Systems Old Syllabus Pack.pdf', size: '4.5 MB' }
      ],
      'ECE': [
        { name: 'C-16 Microprocessors Hand Written Notes.pdf', size: '7.2 MB' }
      ]
    }
  };

  const availableMaterials = materialsDatabase[scheme]?.[branch] || [];

  return (
    <div style={{ padding: '0 2rem' }}>
      <Navbar title="Student Dashboard" />
      
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
        <h3>🔍 Select Backlog Criteria</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
          
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}><strong>SBTET Scheme:</strong></label>
            <select value={scheme} style={{ width: '100%', padding: '10px', borderRadius: '4px' }} onChange={(e) => { setScheme(e.target.value); setBranch(''); }}>
              <option value="">-- Choose Regulation --</option>
              <option value="C-23">C-23 Regulation</option>
              <option value="C-20">C-20 Regulation</option>
            </select>
          </div>

          {scheme && (
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}><strong>Branch / Stream:</strong></label>
              <select value={branch} style={{ width: '100%', padding: '10px', borderRadius: '4px' }} onChange={(e) => setBranch(e.target.value)}>
                <option value="">-- Choose Branch --</option>
                <option value="CME">Computer Engineering (CME)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Materials Results View Panel */}
      {scheme && branch && (
        <div style={{ marginTop: '2rem', padding: '20px', border: '1px solid #b3d7ff', borderRadius: '8px', backgroundColor: '#f0f7ff' }}>
          <h3 style={{ color: '#003366', marginTop: 0 }}>📚 Downloadable Preparation Files ({scheme} - {branch})</h3>
          {availableMaterials.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {availableMaterials.map((file, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                  <div>
                    <span style={{ fontSize: '16px', color: '#333' }}>📄 {file.name}</span>
                    <span style={{ marginLeft: '15px', color: '#888', fontSize: '13px' }}>({file.size})</span>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading: ${file.name}`)}
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No specific backlog materials uploaded yet for this combination.</p>
          )}
        </div>
      )}
    </div>
  );
}
