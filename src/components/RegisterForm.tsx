import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Register.css'; // Import the custom CSS file
import { useLocation } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [instrument, setInstrument] = useState('');
  const location = useLocation();
  const { type } = location.state || { type: [] };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACK_URL_PROD}/auth/register`,
        //`${import.meta.env.VITE_BACK_URL_DEV}/auth/register`,
        {
          email: email,
          password: password,
          username: type === 'admin' ? 'admin' : username,
          instrument: type === 'admin' ? 'admin' : instrument,
        }
      );
      setSuccess('Registration successful! Welcome to the Band!');
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="image-section">
        {/* Optional: Add any additional content here */}
      </div>
      <div className="form-section">
        <div className="form-content">
          <h1 className="text-center mb-4 register-title">Register {type}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label register-input">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={type === 'admin' ? 'admin' : username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label register-input">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label register-input">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {type !== 'admin' && (
              <div className="mb-3">
                <label
                  htmlFor="instrument"
                  className="form-label register-input"
                >
                  Instrument:
                </label>
                <p className="instrument-note">
                  <b>Singers type "singer", other write your instrument.</b>
                </p>
                <input
                  type="text"
                  id="instrument"
                  className="form-control"
                  value={type === 'admin' ? 'admin' : instrument}
                  onChange={(e) => setInstrument(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div>
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
                <button
                  className="btn login-btn w-100"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Move to Login
                </button>
                <br></br>
              </div>
            )}
            <button
              type="submit"
              className="btn register-btn"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
