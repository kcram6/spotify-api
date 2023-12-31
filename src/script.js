// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");


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

const token = 'BQCIgS_CdiH1-3xiY0HUaza6hYQB7F1MxdPMAi1nhTZMLcx-3jPWFN58_QY6QINQUR1cYusrRgESQZLW9WM3jZ8NamhV21T-ybOTSpH2JkTCXVMLOMvc0b0o1zEv8jisLaEIKhSEFPxJwh5C-5nCfyEwKeitSp-WVuIfATIk4WWyveeEWhHCBZ9SiCeqaMEHfPjVz_rGUl05MSLLy9fKrhN6q36_cP7TualCtrqcwJnFIeiHYXL25xUxWJPoaE3TxOrCW3A';
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




async function populateUI() {

  $("#one h4").text(topTracks[0]['name']);
  $("#one .card-title p").text(topTracks[0]['artists'][0]['name']);
  $("#one .card-title img").attr("src", topTracks[0]['album']['images'][2]['url']);
  $("#one a").attr("href", topTracks[0]['external_urls']['spotify']);


  $("#two h4").text(topTracks[1]['name']);
  $("#two .card-title p").text(topTracks[1]['artists'][0]['name']);
  $("#two .card-title img").attr("src", topTracks[1]['album']['images'][2]['url']);
  $("#two a").attr("href", topTracks[1]['external_urls']['spotify']);


  $("#three h4").text(topTracks[2]['name']);
  $("#three .card-title p").text(topTracks[2]['artists'][0]['name']);
  $("#three .card-title img").attr("src", topTracks[2]['album']['images'][2]['url']);
  $("#three a").attr("href", topTracks[2]['external_urls']['spotify']);


  $("#four h4").text(topTracks[3]['name']);
  $("#four .card-title p").text(topTracks[3]['artists'][0]['name']);
  $("#four .card-title img").attr("src", topTracks[3]['album']['images'][2]['url']);
  $("#four a").attr("href", topTracks[3]['external_urls']['spotify']);


  $("#five h4").text(topTracks[4]['name']);
  $("#five .card-title p").text(topTracks[4]['artists'][0]['name']);
  $("#five .card-title img").attr("src", topTracks[4]['album']['images'][2]['url']);
  $("#five a").attr("href", topTracks[4]['external_urls']['spotify']);



  $("#six h4").text(topTracks[5]['name']);
  $("#six .card-title p").text(topTracks[5]['artists'][0]['name']);
  $("#six .card-title img").attr("src", topTracks[5]['album']['images'][2]['url']);
  $("#six a").attr("href", topTracks[5]['external_urls']['spotify']);

  $("#seven h4").text(topTracks[6]['name']);
  $("#seven .card-title p").text(topTracks[6]['artists'][0]['name']);
  $("#seven .card-title img").attr("src", topTracks[6]['album']['images'][2]['url']);
  $("#seven a").attr("href", topTracks[6]['external_urls']['spotify']);

  $("#eight h4").text(topTracks[7]['name']);
  $("#eight .card-title p").text(topTracks[7]['artists'][0]['name']);
  $("#eight .card-title img").attr("src", topTracks[7]['album']['images'][2]['url']);
  $("#eight a").attr("href", topTracks[7]['external_urls']['spotify']);

  $("#nine h4").text(topTracks[8]['name']);
  $("#nine .card-title p").text(topTracks[8]['artists'][0]['name']);
  $("#nine .card-title img").attr("src", topTracks[8]['album']['images'][2]['url']);
  $("#nine a").attr("href", topTracks[8]['external_urls']['spotify']);

  $("#ten h4").text(topTracks[9]['name']);
  $("#ten .card-title p").text(topTracks[9]['artists'][0]['name']);
  $("#ten .card-title img").attr("src", topTracks[9]['album']['images'][2]['url']);
  $("#ten a").attr("href", topTracks[9]['external_urls']['spotify']);


  for (let i = 0; i < 50; i++) {
    const track = recommendedTracks[i]; // Assuming topTracks is an array of track objects
  
    const cardId = `#rec-${i + 1}`;
    $(`${cardId} h4`).text(track.name);
    $(`${cardId} .card-title p`).text(track.artists[0].name);
    $(`${cardId} .card-title img`).attr("src", track.album.images[2].url);
    $(`${cardId} a`).attr("href", track.external_urls.spotify);
  }

  for (let i = 0; i < 20; i++) {
    const artist = topArtists['items'][i]; 
    const cardId = `#art-${i + 1}`;
    $(`${cardId} h4`).text(artist.name);
    $(`${cardId} .card-title p`).text(artist.genres);
    $(`${cardId} .card-title img`).attr("src", artist.images[0].url);
    $(`${cardId} a`).attr("href", artist.external_urls);
  }

  for (let i = 0; i < 20; i++) {
    const artist = topArtistsRecent['items'][i]; 
  
    const cardId = `#artnew-${i + 1}`;
    $(`${cardId} h4`).text(artist.name);
    $(`${cardId} .card-title p`).text(artist.genres);
    $(`${cardId} .card-title img`).attr("src", artist.images[0].url);
    $(`${cardId} a`).attr("href", artist.external_urls);
  }

  for (let i = 0; i < 20; i++) {
    const artist = relatedArtists['artists'][i]; 
  
    const cardId = `#artrec-${i + 1}`;
    $(`${cardId} h4`).text(artist.name);
    $(`${cardId} .card-title p`).text(artist.genres);
    $(`${cardId} .card-title img`).attr("src", artist.images[0].url);
    $(`${cardId} a`).attr("href", artist.external_urls);
  }

  const user = await getUser();
 
  $("#name").text(user['display_name']);
  $("#url").attr("href", user['href']);
  $("#id").text(user['id']);
  $("#imgUrl").attr("src", user['images'][0]['url']);

  // console.log(user);
}


  var idList = [];
  var count = 0;
  topTracks.forEach(track => {
    if (count < 5) {
      idList.push(track.id);
      count++;
    }
  });


  async function getRecommendations(){
    return (await fetchWebApi(
      `v1/recommendations?limit=50&seed_tracks=${idList.join(',')}`, 'GET'
    )).tracks;
  }
  
  const recommendedTracks = await getRecommendations();
  console.log(
    recommendedTracks.map(
      ({name, artists}) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );

  async function getUser(){
    return (await fetchWebApi(
      `v1/me`, 'GET'
    ));
  }


  var recommended = [];
  recommendedTracks.forEach(track => {
    recommended.push(track.id);
  });


  var formattedList = [];
  recommended.forEach(id => {
    formattedList.push("spotify:track:" + id);
  });



  async function getTopArtistsAllTime(){
    return (await fetchWebApi(
      `v1/me/top/artists?limit=20&time_range=long_term`, 'GET'
    ));
  }
  
  const topArtists = await getTopArtistsAllTime();


  async function getTopArtistsRecent(){
    return (await fetchWebApi(
      `v1/me/top/artists?limit=20&time_range=short_term`, 'GET'
    ));
  } 

  const topArtistsRecent = await getTopArtistsRecent();

  const artistRef = topArtistsRecent.items[0].id;
  
  
  async function getArtistRecommendations(){
    return (await fetchWebApi(
      `v1/artists/${artistRef}/related-artists`, 'GET'
    ))
  }
  const relatedArtists = await getArtistRecommendations();
  console.log(relatedArtists);


async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "custom api created playlist",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${formattedList.join(',')}`,
    'POST'
  );

  return playlist;
}

export function makeRec() {
  const createdPlaylist = createPlaylist(formattedList);
  console.log(createdPlaylist.name, createdPlaylist.id);
}

populateUI();
