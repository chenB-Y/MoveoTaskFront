import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

function LivePage() {
  const location = useLocation();
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();
  const { response, songName, artist, admin } = location.state || {
    response: {},
    songName: '',
    artist: '',
    admin: '',
  };

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_BACK_URL_PROD}`, {
      //const newSocket = io(`${import.meta.env.VITE_BACK_URL_DEV}`, {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (err) => {
      console.log('Socket connection error:', err.message);
    });

    if (newSocket) {
      newSocket.on('Quit', () => {
        console.log('Quit from clientId:', newSocket.id);
        if (admin === 'admin') navigate('/adminHomePage');
        else navigate('/HomePage', { state: { response: admin } });
      });
    }

    setSocket(newSocket);

    return () => {
      newSocket.off('startLive');
      newSocket.disconnect();
    };
  }, []);

  const handleQuit = () => {
    console.log('Quit!!!');
    if (socket) {
      console.log('Quit from clientId:', socket.id);
      socket.emit('Quit');
    }
    navigate('/AdminHomePage');
  };

  const toggleScrolling = () => {
    setIsScrolling((prev) => !prev);
  };

  useEffect(() => {
    if (isScrolling) {
      scrollIntervalRef.current = window.setInterval(() => {
        window.scrollBy(0, 3); // Increased the scroll step to 3 pixels for faster scrolling
      }, 20); // Decreased the interval to 20ms for faster updates
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling]);

  // Access songContent from the response object
  const songContent = response.songContent || '';

  return (
    <div className="App" style={{ padding: '50px', position: 'relative' }}>
      {admin === 'singer' ? (
        <div>
          <h1>Song Lyrics</h1>
          <h2>Enjoy singing</h2>
        </div>
      ) : (
        <div>
          <h1>Song Lyrics and Chords</h1>
          <h2>Enjoy playing {admin}</h2>
        </div>
      )}
      <h1>{songName + ' ' + artist}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: songContent }}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          marginTop: '20px',
          fontSize: '75px',
          maxWidth: '90%',
        }}
      />
      {admin === 'admin' && <button onClick={handleQuit}>Quit</button>}
      {/* Floating Toggle Button */}
      <button
        onClick={toggleScrolling}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isScrolling ? 'red' : 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
      </button>
    </div>
  );
}

export default LivePage;
