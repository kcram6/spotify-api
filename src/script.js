// const clientId = "8119c4e158224814bae3c75a5bbd5972"; // Replace with your client ID
// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");
// // let token = "AQAfoehhfOKSyTYLiNQGfqZUhuwDyWUku2IGPtyPgEcy1VOlPKQ2AD21z--GEz0kOl2vnrS7GhyjdwcMuqVGRR2rySKhPHl9SdTG7vm0A-n6qtZqmTqc0Pv0__KAOGu4zUdm5za5hWKT5KwsLloikgpACCEoN7q7NCov-CgsznJtU8BIBQk4CPIQ7QaUeQcs67dl0RcOxnvakL-szJDxnMpC7gJIHHuDLqNotJ8uC20WjwrD0AcDYd_KnsGrwDM9qV-jfNtJswnKaVRJAR9B0dEaXp1pplSJJg";


// if (!code) {
//     redirectToAuthCodeFlow(clientId);
// } else {
//     const accessToken = await getAccessToken(clientId, code);

//     const profile = await fetchProfile(accessToken);
//     console.log(profile); // Profile data logs to console
//     console.log("access token: ", accessToken)
//     populateUI(profile);
// }

// export async function getAccessToken(clientId, code) {
//     const verifier = localStorage.getItem("verifier");

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("grant_type", "authorization_code");
//     params.append("code", code);
//     params.append("redirect_uri", "http://localhost:5173/callback");
//     params.append("code_verifier", verifier);

//     const result = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: params
//     });

//     const { access_token } = await result.json();
//     return access_token;
// }


// async function fetchProfile(token) {
//     const result = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     return await result.json();
// }

// function populateUI(profile) {
//     document.getElementById("displayName").innerText = profile.display_name;
//     if (profile.images[0]) {
//         const profileImage = new Image(200, 200);
//         profileImage.src = profile.images[0].url;
//         document.getElementById("avatar").appendChild(profileImage);
//         document.getElementById("imgUrl").innerText = profile.images[0].url;
//     }
//     document.getElementById("id").innerText = profile.id;
//     document.getElementById("email").innerText = profile.email;
//     document.getElementById("uri").innerText = profile.uri;
//     document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url").innerText = profile.href;
//     document.getElementById("url").setAttribute("href", profile.href);
// }

// export async function redirectToAuthCodeFlow(clientId) {
//     const verifier = generateCodeVerifier(128);
//     const challenge = await generateCodeChallenge(verifier);

//     localStorage.setItem("verifier", verifier);

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("response_type", "code");
//     params.append("redirect_uri", "http://localhost:5173/callback");
//     params.append("scope", "user-read-private user-read-email");
//     params.append("code_challenge_method", "S256");
//     params.append("code_challenge", challenge);

//     document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }

// function generateCodeVerifier(length) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }

// async function generateCodeChallenge(codeVerifier) {
//     const data = new TextEncoder().encode(codeVerifier);
//     const digest = await window.crypto.subtle.digest('SHA-256', data);
//     return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//         .replace(/\+/g, '-')
//         .replace(/\//g, '_')
//         .replace(/=+$/, '');
// }



// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBn8tg7gYAPxNM8vqRy-SHCgd1XbfmPlS6VIWvipvMT5ZLRoj3IDv-Z0dsbVhk0Ee-bkhY77kub9vje60pmaoPYai0uU8iTlgIOIuEKPOeES9uzO9KuK0IG4l6a6pp4Rqx9NOUbGBN3UD9fW7HDZrIlWHMY6nKu8811lFca_Yen47xb433uHsZPWMidh8hRWFmbwWG8LZUrt5s2j_7JRe9kCiSI9NyU5voC28MDPio4hlT-X97mtm7huUJL5r-LNYGBkos';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=10', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

function populateUI() {
  document.getElementById("displayName").innerText = topTracks[0].name
  document.getElementById("id").innerText = topTracks[3].name;
  document.getElementById("email").innerText = topTracks[1].name;
  document.getElementById("uri").innerText = topTracks[2].name;
  // document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  // document.getElementById("url").setAttribute("href", profile.href);
}

populateUI();

  var idList = [];
  topTracks.forEach(track => {
    idList.push(track.id);
   });

   async function getRecommendations(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
      `v1/recommendations?limit=5&seed_tracks=${idList.join(',')}`, 'GET'
    )).tracks;
  }
  
  const recommendedTracks = await getRecommendations();
  // console.log(
  //   recommendedTracks.map(
  //     ({name, artists}) =>
  //       `${name} by ${artists.map(artist => artist.name).join(', ')}`
  //   )
  // );

  var recommended = [];
  recommendedTracks.forEach(track => {
    recommended.push(track.id);
   });


  var formattedList = [];
  recommended.forEach(id => {
    formattedList.push("spotify:track:" + id);
   });


async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${formattedList.join(',')}`,
    'POST'
  );

  return playlist;
}

  // const createdPlaylist = await createPlaylist(formattedList);
  // console.log(createdPlaylist.name, createdPlaylist.id);

