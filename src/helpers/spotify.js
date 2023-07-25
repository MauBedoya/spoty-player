const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "0f07f63a507b42b29e58fc4c3def0253";
const redirectURI = "http://localhost:5173/";
// access to user's library and playlists
const scopes = ["user-library-read", "playlist-read-private"];

// Spotify Endpoints
export const api = {
  CURRENT_USER: "https://api.spotify.com/v1/me",
  USER_PLAYLISTS: "https://api.spotify.com/v1/me/playlists?limit=15&offset=0",
}

// log-in endpoint to OAuth 2.0
export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

// Spotify API
export const spotifyApi = async (url, cbSuccess) => {

  let token = window.sessionStorage.getItem("currentToken");
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) {
      throw {
        status: res.status,
        statusText: res.message 
          ? res.message 
          : "Ocurrió un error"
      }
    }
    const json = await res.json();
    
    cbSuccess(json)

  } catch (error) {
    console.log(`Error ${error.status}: ${error.message}`);
  }
}
