import { useEffect, useState } from 'react';
import './App.css';
import Spotify from './api/Spotify';

function App() {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = Spotify.handleAuthorization();
    if (token) {
      setAuthorized(true);
    }
  }, []);

  return (
    <>
      <h1>TrackVerse</h1>
      {!isAuthorized ? <p>Please Log in...</p> : <p>Logged in</p>}
    </>
  );
}

export default App;
