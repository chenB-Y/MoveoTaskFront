import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [instrument, setInstrument] = useState('');
  const location = useLocation();
  const { type } = location.state || { type: [] };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://moveotaskback-production.up.railway.app/auth/register',
        {
          email: email,
          password: password,
          username: type === 'admin' ? 'admin' : username,
          instrument: type === 'admin' ? 'admin' : instrument,
        }
      );
      // Handle successful response
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle error
      setError('An error occurred' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
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
          />
        </div>
        {type !== 'admin' && (
          <div>
            <label htmlFor="instrument">Instrument:</label>
            <input
              type="text"
              id="instrument"
              value={type === 'admin' ? 'admin' : instrument}
              onChange={(e) => setInstrument(e.target.value)}
              required
            />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
