import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL_PROD}/auth/register`,
        //`${import.meta.env.VITE_BACK_URL_DEV}/auth/register`,
        {
          email: email,
          password: password,
          username: type === 'admin' ? 'admin' : username,
          instrument: type === 'admin' ? 'admin' : instrument,
        }
      );
      // Handle successful response
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful! Welcome to the Band!');
    } catch (error) {
      // Handle error
      setError('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ padding: '20px' }}>
      <h1>Register {type}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={type === 'admin' ? 'admin' : username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {type !== 'admin' && (
          <div>
            <label htmlFor="instrument">Instrument:</label>
            <p>
              <b>Singers type "singer", other write your instrument.</b>
            </p>
            <input
              type="text"
              id="instrument"
              value={type === 'admin' ? 'admin' : instrument}
              onChange={(e) => setInstrument(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        )}
        {error && (
          <p className="error" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        {success && (
          <p className="success" style={{ color: 'green' }}>
            {success}
          </p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
