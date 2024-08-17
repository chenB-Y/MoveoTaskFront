import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import LoginPage from './components/LoginForm';
//import RegisterPage from './components/RegisterForm';
//import HomePage from './components/HomePage';
//import AdminHomePage from './components/AdminHomePage';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
