// API service for podcast data

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Podcast {
  id?: string;
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  artworkUrl100: string;
  primaryGenreName: string;
  genres: string[];
  kind?: string;
  // Add other fields as needed
}

// Episode interface removed as the API only returns podcasts

export interface SearchResponse {
  resultCount: number;
  results: Podcast[];
  source: 'api' | 'database';
}

export const searchPodcasts = async (term: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_URL}/podcasts/search?term=${encodeURIComponent(term)}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching podcasts:', error);
    return { resultCount: 0, results: [], source: 'api' };
  }
};

export const getAllPodcasts = async (): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_URL}/podcasts/all`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching all podcasts:', error);
    return { resultCount: 0, results: [], source: 'database' };
  }
};

export interface ClearDatabaseResponse {
  success: boolean;
  message: string;
  affected?: number;
}

export const clearDatabase = async (): Promise<ClearDatabaseResponse> => {
  try {
    const response = await fetch(`${API_URL}/podcasts/clear`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error clearing database:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
