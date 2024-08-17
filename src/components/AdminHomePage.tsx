import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHomePage.css';

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
        `${import.meta.env.VITE_BACK_URL_PROD}/admin/desireSong`,
        //`${import.meta.env.VITE_BACK_URL_DEV}/admin/desireSong`,
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
      <h1>Search any song . . .</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="SongName" className="admin-input">
            DesireSong:
          </label>
          <input
            type="text"
            id="SongName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>
        <br></br>
        {error && <p className="error ">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Good choice !' : 'search'}
        </button>
      </form>
    </div>
  );
};

export default AdminHomePage;
