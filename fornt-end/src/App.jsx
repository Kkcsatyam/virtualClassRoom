// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ClassDetail from './pages/ClassDetail';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/class/:classId" element={<ProtectedRoute><ClassDetail /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
