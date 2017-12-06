const clientId = 'f3cddfd9a94743f49d42d669d2856fef';
const secret = 'fa50d0b20efc4fbab085b4ce3ace2971';
const uri = "http://localhost:3000"
let accessToken ='';

const Spotify = {
  getAccessToken(){
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return(
      fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${uri}%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09`).then(
        response => {
	        if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => {
          console.log(networkError.message);
          }).then(jsonResponse => jsonResponse)
        )
        console.log('here');
      }

/*
  return (
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
      method: 'POST',
      //body: JSON.stringify({id: '200'})
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => accessToken = jsonResponse.access_token)
  );
*/
}
console.log(Spotify.getAccessToken());

//export default Spotify;
