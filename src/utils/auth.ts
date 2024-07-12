// src/auth.js
import queryString from "query-string";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "e099d2388e97485ab9cfaf025d3c1bc4";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-read-private", "user-read-email"];

export const getTokenFromUrl = () => {
  return queryString.parse(window.location.hash.substring(1));
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
