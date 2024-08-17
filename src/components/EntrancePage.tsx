import React from 'react';
import { useNavigate } from 'react-router-dom';

const EntrancePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAdmin = () => {
    navigate('/admin', { state: { type: 'admin' } });
  };

  return (
    <div
      className="entrance-container"
      style={{ textAlign: 'center', marginTop: '50px' }}
    >
      <h1>Hello to the Band</h1>
      <div style={{ margin: '20px' }}>
        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>
        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
        <button onClick={handleAdmin} style={buttonStyle}>
          Admin
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default EntrancePage;
