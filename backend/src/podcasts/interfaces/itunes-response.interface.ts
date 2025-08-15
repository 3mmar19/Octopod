// ------------------------------------------------ iTunes Result Interface ---------------------------------------------//
export interface ItunesResult {
  collectionId: number;
  trackId?: number;
  artistName: string;
  collectionName: string;
  trackName?: string;
  feedUrl?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  primaryGenreName?: string;
  genres?: string[];
  kind?: string;
  // Other fields that might be returned but we don't use
  [key: string]: any;
}

// ------------------------------------------------ iTunes API Response Interface ---------------------------------------------//
export interface ItunesApiResponse {
  resultCount: number;
  results: ItunesResult[];
}
