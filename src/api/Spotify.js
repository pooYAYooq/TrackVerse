const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:5173/';

let accessToken;
let expirationTime;

const Spotify = {
  /**
   * Retrieves an access token for Spotify API authentication.
   *
   * Checks if a valid access token is already available and returns it if so.
   * Otherwise, it attempts to extract the access token from the URL and sets
   * the expiration time. If no access token is found, it redirects the user to
   * the Spotify authorization page.
   *
   * @return {string} The access token for Spotify API authentication
   */
  getAccessToken() {
    if (accessToken && Date.now() < expirationTime) {
      return accessToken;
    }

    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Set expiration time
      expirationTime = Date.now() + expiresIn * 1000;

      // Clear parameters from URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  /**
   * Handles the authorization process by retrieving an access token.
   *
   * @return {string} The access token if authorization is successful, otherwise undefined.
   */
  handleAuthorization() {
    try {
      const token = this.getAccessToken();
      if (token) {
        console.log('Authorization successful');
        return token;
      }
    } catch (error) {
      console.error('Authorization failed:', error);
    }
  },
};

export default Spotify;
