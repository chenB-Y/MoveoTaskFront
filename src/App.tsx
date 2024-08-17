import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHomePage from './components/AdminHomePage';
import ResultPage from './components/ResultPage';
import LivePage from './components/LivePage';
import LoginPage from './components/LoginForm';
import RegisterPage from './components/RegisterForm';
import HomePage from './components/HomePage';
import EntrancePage from './components/EntrancePage';
import ErrorPage from './components/ErrorPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntrancePage />} />
        <Route path="/admin" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resultPage" element={<ResultPage />} />
        <Route path="/LivePage" element={<LivePage />} />
        <Route path="/adminHomePage" element={<AdminHomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
