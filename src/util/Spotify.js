const clientId = 'f3cddfd9a94743f49d42d669d2856fef';
const redirectUri = 'http://localhost:3000/';
const spotifyUrl = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      console.log(accessToken);
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('accessToken', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },

  search(term) {
  return(
    Spotify.getAccessToken().then(()=>{
    return(
    fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term.replace(' ','%20')}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
      }).then(
      response => {
  	   if (response.ok) {
         return response.json();
       }
       throw new Error('Request failed!');
       }, networkError => {
         console.log(networkError.message);
      }).then(jsonResponse => {
        if(jsonResponse.tracks){
          return jsonResponse.tracks.map(track =>{
            return(
            {
              Id:track.id,
              Name:track.name,
              Artist:track.artists[0].name,
              Album:track.album.name,
              uri:track.uri
            })
          })
        } else{
          return [];
        }

      })
    )
   })
   )
   }

}

export default Spotify;
