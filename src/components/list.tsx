import { IAlbum } from "@/utils/interfaces/album.interface";
import { IArtist } from "@/utils/interfaces/artist.interface";
import { ITrack } from "@/utils/interfaces/track.interface";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import logoutI from "../assets/logoutI.svg";
import searchI from "../assets/searchI.svg";
import { useSearchParams } from "next/navigation";

const ListPage = ({
  token,
  setToken,
}: {
  token: string | (string | null)[];
  setToken: Dispatch<SetStateAction<string | (string | null)[]>>;
}) => {
  const queryParams = useSearchParams();
  const search = queryParams.get("search");

  const [searchTerm, setSearchTerm] = useState<string>(search ?? "");
  const [searchResults, setSearchResults] = useState<{
    artists: {
      items: IArtist[];
    };
    tracks: {
      items: ITrack[];
    };
    albums: {
      items: IAlbum[];
    };
  }>();

  const searchSpotify = async (e?: any) => {
    if (e) e.preventDefault();
    if (!token) return;

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchTerm,
          type: "artist,track,album",
          limit: 10,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken("");
  };

  useEffect(() => {
    if (search && search?.length > 0) {
      searchSpotify();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="list-main-container">
      <header>
        <button type="button" onClick={logout} className="logout">
          <Image src={logoutI} alt="logout icon" />
        </button>

        <form onSubmit={searchSpotify}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for artists, tracks, or albums"
          />
          <button type="submit">
            <Image src={searchI} alt="search icon" />
          </button>
        </form>
      </header>

      <section className="results-lists-container">
        <section>
          <h2>Artists</h2>
          {searchResults?.artists ? (
            searchResults.artists.items.map((artist) => {
              const urlArray = artist.href.split("/");

              return (
                <Link
                  href={`/details?type=${urlArray[urlArray.length - 2]}&id=${
                    urlArray[urlArray.length - 1]
                  }&search=${searchTerm}`}
                  key={artist.id}
                  className={`results-link artist  ${
                    artist.images.length === 0 && "without-image"
                  }`}
                >
                  {artist.images.length > 0 && (
                    <Image
                      src={artist.images[0].url}
                      alt="artist image"
                      width={artist.images[0].width}
                      height={artist.images[0].height}
                      className="image"
                    />
                  )}

                  <p>{artist.name}</p>
                </Link>
              );
            })
          ) : (
            <div className="results-link is-empty"></div>
          )}
        </section>

        <section>
          <h2>Tracks</h2>
          {searchResults?.tracks ? (
            searchResults.tracks.items.map((track) => {
              const urlArray = track.href.split("/");

              return (
                <Link
                  href={`/details?type=${urlArray[urlArray.length - 2]}&id=${
                    urlArray[urlArray.length - 1]
                  }&search=${searchTerm}`}
                  key={track.id}
                  className="results-link tracks"
                >
                  <p>{track.name}</p>
                  <span>{track.artists[0].name}</span>
                </Link>
              );
            })
          ) : (
            <div className="results-link is-empty"></div>
          )}
        </section>

        <section>
          <h2>Albums</h2>
          {searchResults?.albums ? (
            searchResults.albums.items.map((album) => {
              const urlArray = album.href.split("/");

              return (
                <Link
                  href={`/details?type=${urlArray[urlArray.length - 2]}&id=${
                    urlArray[urlArray.length - 1]
                  }&search=${searchTerm}`}
                  key={album.id}
                  className={`results-link album ${
                    album.images.length === 0 && "without-image"
                  }`}
                >
                  {album.images.length > 0 && (
                    <Image
                      src={album.images[0].url}
                      alt="album image"
                      width={album.images[0].width}
                      height={album.images[0].height}
                      className="image"
                    />
                  )}

                  <div className="album-info">
                    <p>{album.name}</p>
                    <span>{album.artists[0].name}</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="results-link is-empty"></div>
          )}
        </section>
      </section>
    </main>
  );
};

export default ListPage;
