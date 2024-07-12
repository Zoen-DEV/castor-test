"use client";
import { IDetails } from "@/utils/interfaces/details.interface";
import axios from "axios";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import arrowBack from "../../assets/arrowBack.svg";
import Image from "next/image";
import SpotifyPlayer from "@/components/player";

const Details = () => {
  const queryParams = useSearchParams();
  const search = queryParams.get("search");
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  const url = `https://api.spotify.com/v1/${type}/${id}`;

  const token = window.localStorage.getItem("token")

  const [details, setDetails] = useState<IDetails>();

  const getDetails = async (data: string, token: string) => {
    try {
      const results = await axios.get(data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (results) {
        setDetails(results.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const _token = window.localStorage.getItem("token");

    if (_token) {
      getDetails(url, _token);
    } else {
      redirect("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    details && (
      <main className="details-main-container">
        <section className="details-container">
          <Link href={`/?search=${search}`} className="forward-button">
            <Image src={arrowBack} alt="arrow back" />
          </Link>
          <div className="content">
            {details?.images && (
              <Image
                src={details.images[0].url}
                alt="artist image"
                className="banner"
                width={details.images[0].width}
                height={details.images[0].height}
              />
            )}
            <div className="details-info-container">
              <h1>{details.name}</h1>
              {details.type === "artist" ? (
                <span>{details.followers?.total} followers</span>
              ) : details.type === "album" ? (
                <span>{details.total_tracks} songs</span>
              ) : (
                <span className="artist-list">
                  {details.artists.map((artist, index) => (
                    <p key={artist.id}>
                      {artist.name}
                      {index !== details.artists.length - 1 && " -"}
                    </p>
                  ))}
                </span>
              )}

              {details.type === "track" && <SpotifyPlayer token={token} trackId={id} />}
            </div>
          </div>
        </section>
      </main>
    )
  );
};

export default Details;
