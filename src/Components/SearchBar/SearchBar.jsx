// SearchBar.jsx

import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search for a song, artist, or album..." />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
