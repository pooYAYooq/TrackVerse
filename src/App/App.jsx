import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Spotify from '../api/Spotify';
import SearchBar from '../Components/SearchBar/SearchBar';

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
      <h1 className={styles.title}>TrackVerse</h1>
      {!isAuthorized ? <p>Please Log in...</p> : <p>Logged in</p>}
      <SearchBar /> {/* Display the SearchBar */}
    </>
  );
}

export default App;
