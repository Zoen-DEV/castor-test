import React from "react";

const LoginPage = () => {
  const CLIENT_ID = "e099d2388e97485ab9cfaf025d3c1bc4";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <main className="login-main-container">
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>
    </main>
  );
};

export default LoginPage;
