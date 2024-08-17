import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EntrancePage.css'; // Import the CSS file

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
    <div id="entranceContainerWrapper">
      <div className="entranceBackground"></div>
      <div className="entranceContainer">
        <h1 className="entranceHeading">Hello to the Moveo Band</h1>
        <div className="buttonContainer">
          <button onClick={handleRegister} className="button">
            User Register
          </button>
          <button onClick={handleLogin} className="button">
            Login
          </button>
          <button onClick={handleAdmin} className="button">
            Admin Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrancePage;
