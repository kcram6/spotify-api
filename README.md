# spotify-api

### How to install and run
1. Clone the repository
2. Generate an access token 
`curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"`
3. Run `npm install`
4. Run `npm run dev`
5. Visit your localhost
