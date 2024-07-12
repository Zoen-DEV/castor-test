import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const SpotifyPlayer = ({ token, trackId }: {
    token: string | null;
    trackId: string | null;
  }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
      spotifyApi.getTrack(trackId!)
        .then(track => {
          setPreviewUrl(track.preview_url);
        })
        .catch(err => console.error(err));
    }
  }, [token, trackId]);

  return (
    <section className='player-container'>
      {previewUrl ? (
        <audio controls className="audio">
          <source src={previewUrl} type="audio/mpeg" />
        </audio>
      ) : (
        <p>Loading preview...</p>
      )}
    </section>
  );
};

export default SpotifyPlayer;
