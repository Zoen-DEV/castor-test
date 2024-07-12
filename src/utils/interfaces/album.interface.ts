import { IArtistLight } from "./artist.interface";

export interface IAlbum {
  album_type: string;
  artists: IArtistLight[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
