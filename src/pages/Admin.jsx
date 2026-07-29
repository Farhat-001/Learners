import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({ scheme: 'C-20', branch: 'CME', title: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [studentForm, setStudentForm] = useState({ pin_no: '', scheme: 'C-20', branch: 'CME' });
const [addingStudent, setAddingStudent] = useState(false);

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from('materials').select('*').order('created_at', { ascending: false });
    if (!error) setMaterials(data);
    else console.error(error);
  };

  useEffect(() => { fetchMaterials(); }, []);

const handleAddStudent = async (e) => {
  e.preventDefault();
  setAddingStudent(true);

  const { error } = await supabase.from('students').insert([{
    pin: studentForm.pin_no,
    scheme: studentForm.scheme,
    branch: studentForm.branch
  }]);

  if (error) {
    if (error.code === '23505') {
      alert('That PIN is already taken. Please use a different PIN.');
    } else {
      alert('Failed to add student: ' + error.message);
    }
  } else {
    alert('Student added successfully!');
    setStudentForm({ pin_no: '', scheme: 'C-20', branch: 'CME' });
  }
  setAddingStudent(false);
};
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { alert('Please choose a PDF file first.'); return; }
    setUploading(true);

    const filePath = `${form.scheme}/${form.branch}/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('materials')
      .upload(filePath, file);

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('materials').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('materials').insert([{
      scheme: form.scheme,
      branch: form.branch,
      title: form.title,
      file_url: urlData.publicUrl
    }]);

    if (insertError) {
      alert('Saving record failed: ' + insertError.message);
    } else {
      setForm({ scheme: 'C-20', branch: 'CME', title: '' });
      setFile(null);
      fetchMaterials();
    }
    setUploading(false);
  };

  const deleteMaterial = async (id) => {
    await supabase.from('materials').delete().eq('id', id);
    fetchMaterials();
  };

  return (
    <div style={{ padding: '0 2rem' }}>
      <Navbar title="Administrator Control Console" />

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>

        <div style={{ flex: '1', minWidth: '300px', background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3 style={{ color: '#003366', marginTop: 0 }}>📋 Upload Study Material</h3>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>Title:</label>
              <input type="text" value={form.title} placeholder="e.g., DBMS Notes Unit 1" required style={{ width: '100%', padding: '8px' }} onChange={e => setForm({...form, title: e.target.value})} />
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
                  <option value="C-23">C-23</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>PDF File:</label>
              <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
            </div>
            <button type="submit" disabled={uploading} style={{ backgroundColor: '#003366', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {uploading ? 'Uploading...' : 'Upload Material'}
            </button>
          </form>
        </div>
        <div style={{ flex: '1', minWidth: '300px', background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
  <h3 style={{ color: '#003366', marginTop: 0 }}>🎓 Add Student</h3>
  <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div>
      <label style={{ display: 'block', fontSize: '14px' }}>PIN Number:</label>
      <input type="text" value={studentForm.pin_no} required style={{ width: '100%', padding: '8px' }} onChange={e => setStudentForm({...studentForm, pin_no: e.target.value})} />
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '14px' }}>Branch:</label>
        <select value={studentForm.branch} style={{ width: '100%', padding: '8px' }} onChange={e => setStudentForm({...studentForm, branch: e.target.value})}>
          <option value="CME">CME</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '14px' }}>Scheme:</label>
        <select value={studentForm.scheme} style={{ width: '100%', padding: '8px' }} onChange={e => setStudentForm({...studentForm, scheme: e.target.value})}>
          <option value="C-20">C-20</option>
          <option value="C-16">C-16</option>
          <option value="C-23">C-23</option>
        </select>
      </div>
    </div>
    <button type="submit" disabled={addingStudent} style={{ backgroundColor: '#003366', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
      {addingStudent ? 'Adding...' : 'Add Student'}
    </button>
  </form>
</div>

        <div style={{ flex: '2', minWidth: '500px' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>📊 Uploaded Materials</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#003366', color: 'white' }}>
                <th style={{ padding: '12px' }}>Title</th>
                <th style={{ padding: '12px' }}>Branch</th>
                <th style={{ padding: '12px' }}>Scheme</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{m.title}</td>
                  <td style={{ padding: '12px' }}>{m.branch}</td>
                  <td style={{ padding: '12px' }}>{m.scheme}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => deleteMaterial(m.id)}
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