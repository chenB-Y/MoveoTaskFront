// HomePage
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [waiting, setWaiting] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Access the response data passed from LoginForm
  const { response } = location.state || {}; // Default to an empty object if state is undefined

  useEffect(() => {
    // Ensure response is defined before using it
    if (!response) {
      console.error('No response data available');
      return;
    }

    console.log('HomePage response:', response);
    const socket = io(`${import.meta.env.VITE_BACK_URL_PROD}`, {
      //const socket = io(`${import.meta.env.VITE_BACK_URL_DEV}`, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('connect_error', (err) => {
      console.log('Socket connection error:', err.message);
    });

    // Determine the event based on the response data
    const event =
      response === 'singer' ? 'startLiveSingers' : 'startLiveInstruments';
    socket.on(event, (res, songName, artist) => {
      console.log('Received startLive event');
      setWaiting(false);
      navigate('/LivePage', {
        state: { response: res.data, songName, artist, admin: response },
      });
    });

    return () => {
      socket.off(event);
      socket.disconnect();
    };
  }, [response, navigate]);

  return (
    <div className="home-container">
      <h1>
        {waiting ? <p>Waiting for next song . . . </p> : <p>Here we go !</p>}
      </h1>
    </div>
  );
};

export default HomePage;
