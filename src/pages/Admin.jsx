import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';
import './Admin.css';

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
      pin: studentForm.pin_no, scheme: studentForm.scheme, branch: studentForm.branch
    }]);
    if (error) {
      alert(error.code === '23505' ? 'That PIN is already taken. Please use a different PIN.' : 'Failed to add student: ' + error.message);
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
    const { error: uploadError } = await supabase.storage.from('materials').upload(filePath, file);
    if (uploadError) { alert('Upload failed: ' + uploadError.message); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('materials').getPublicUrl(filePath);
    const { error: insertError } = await supabase.from('materials').insert([{
      scheme: form.scheme, branch: form.branch, title: form.title, file_url: urlData.publicUrl
    }]);
    if (insertError) { alert('Saving record failed: ' + insertError.message); }
    else { setForm({ scheme: 'C-20', branch: 'CME', title: '' }); setFile(null); fetchMaterials(); }
    setUploading(false);
  };

  const deleteMaterial = async (id) => {
    await supabase.from('materials').delete().eq('id', id);
    fetchMaterials();
  };

  return (
    <div className="page">
      <Navbar title="Administrator Control Console" />

      <div className="admin-grid">
        <div className="card">
          <h3 className="card-title">Upload Study Material</h3>
          <form onSubmit={handleUpload} className="form-stack">
            <div>
              <label className="field-label">Title</label>
              <input type="text" className="field-input" value={form.title} placeholder="e.g., DBMS Notes Unit 1" required
                onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-row">
              <div>
                <label className="field-label">Branch</label>
                <select className="field-select" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>
                  <option value="CME">CME</option><option value="ECE">ECE</option><option value="EEE">EEE</option>
                </select>
              </div>
              <div>
                <label className="field-label">Scheme</label>
                <select className="field-select" value={form.scheme} onChange={e => setForm({ ...form, scheme: e.target.value })}>
                  <option value="C-20">C-20</option><option value="C-16">C-16</option><option value="C-23">C-23</option>
                </select>
              </div>
            </div>
            <div>
              <label className="field-label">PDF File</label>
              <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
            </div>
            <button type="submit" disabled={uploading} className="btn btn-primary">
              {uploading ? 'Uploading…' : 'Upload Material'}
            </button>
          </form>
        </div>

        <div className="card">
          <h3 className="card-title">Add Student</h3>
          <form onSubmit={handleAddStudent} className="form-stack">
            <div>
              <label className="field-label">PIN Number</label>
              <input type="text" className="field-input" value={studentForm.pin_no} required
                onChange={e => setStudentForm({ ...studentForm, pin_no: e.target.value })} />
            </div>
            <div className="form-row">
              <div>
                <label className="field-label">Branch</label>
                <select className="field-select" value={studentForm.branch} onChange={e => setStudentForm({ ...studentForm, branch: e.target.value })}>
                  <option value="CME">CME</option><option value="ECE">ECE</option><option value="EEE">EEE</option>
                </select>
              </div>
              <div>
                <label className="field-label">Scheme</label>
                <select className="field-select" value={studentForm.scheme} onChange={e => setStudentForm({ ...studentForm, scheme: e.target.value })}>
                  <option value="C-20">C-20</option><option value="C-16">C-16</option><option value="C-23">C-23</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={addingStudent} className="btn btn-primary">
              {addingStudent ? 'Adding…' : 'Add Student'}
            </button>
          </form>
        </div>

        <div className="card materials-table-card">
          <h3 className="card-title">Uploaded Materials</h3>
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Branch</th><th>Scheme</th><th>Action</th></tr>
            </thead>
            <tbody>
              {materials.map(m => (
                <tr key={m.id}>
                  <td>{m.title}</td>
                  <td>{m.branch}</td>
                  <td>{m.scheme}</td>
                  <td><button onClick={() => deleteMaterial(m.id)} className="btn btn-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}