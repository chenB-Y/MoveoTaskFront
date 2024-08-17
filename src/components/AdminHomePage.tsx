import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHomePage: React.FC = () => {
  const [songName, setSongName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/admin/desireSong',
        { songName }
      );
      navigate('/resultPage', { state: { response: response.data } });
    } catch (error) {
      setError('An error occurred: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Admin Home</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="SongName">DesireSong:</label>
          <input
            type="text"
            id="SongName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'waitttttt!' : 'connect to everybody'}
        </button>
      </form>
    </div>
  );
};

export default AdminHomePage;
