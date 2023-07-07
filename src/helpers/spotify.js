const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "0f07f63a507b42b29e58fc4c3def0253";
const redirectURI = "http://localhost:5173/";

// access to user's library and playlists
const scopes = ["user-library-read", "playlist-read-private"];

// log-in endpoint to OAuth 2.0
export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;