import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';

interface Song {
  songTitle: string;
  artist: string;
  href: string;
}

const ResultPage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const location = useLocation();
  const { response } = location.state || { response: [] }; // Get the response data from the state
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('https://moveotaskback-production.up.railway.app', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (err) => {
      console.log('Socket connection error:', err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off('startLive');
      newSocket.disconnect();
    };
  }, []);

  const handleTitleClick = async (
    href: string,
    songName: string,
    artist: string
  ) => {
    const responseInst = await axios.post(
      'https://moveotaskback-production.up.railway.app/song/instruments',
      {
        desireSong: href,
      }
    );
    console.log('Sending startLive event for instruments');
    if (socket) {
      socket.emit('startLiveInstruments', responseInst, songName, artist);
    }

    const responseSingers = await axios.post(
      'https://moveotaskback-production.up.railway.app/song/singers',
      {
        desireSong: href,
      }
    );
    console.log('Sending startLive event for singers');
    if (socket) {
      socket.emit('startLiveSingers', responseSingers, songName, artist);
    }
    const admin = 'admin';
    navigate('/LivePage', {
      state: { response: responseInst.data, songName, artist, admin: admin },
    });
  };

  return (
    <div className="result-container">
      <h1>Result Page</h1>
      {response.length > 0 ? (
        <div className="result-list">
          {response.map((item: Song, index: number) => (
            <div key={index} className="result-item">
              <div className="result-row">
                <p
                  className="song-title"
                  onClick={() =>
                    handleTitleClick(item.href, item.songTitle, item.artist)
                  }
                >
                  {item.songTitle}
                </p>
                <p className="artist">{item.artist}</p>
              </div>
              <a
                href={item.href}
                className="hidden-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ResultPage;
