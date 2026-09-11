import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="page-transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
