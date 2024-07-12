import { IAlbum } from "./album.interface";
import { IArtistLight } from "./artist.interface";

export interface ITrack {
  album: IAlbum;
  artists: IArtistLight[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url?: string | null;
  track_number: number;
  type: string;
  uri: string;
}
