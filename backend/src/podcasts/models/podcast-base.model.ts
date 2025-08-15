import { ApiProperty } from '@nestjs/swagger';

// ------------------------------------------------ Base Model Definition ---------------------------------------------//
/**
 * Base class for podcast-related models
 * Contains common properties shared between entity and DTOs
 */
export class PodcastBase {
  // ------------------------------------------------ Identifier Properties ---------------------------------------------//
  @ApiProperty({ description: 'Unique identifier', required: false })
  id?: string;
  
  // ------------------------------------------------ Core Metadata ---------------------------------------------//
  @ApiProperty({ description: 'iTunes collection ID' })
  collectionId: number;
  
  @ApiProperty({ description: 'Podcast name' })
  collectionName: string;
  
  @ApiProperty({ description: 'Artist name' })
  artistName: string;
  
  @ApiProperty({ description: 'Track name' })
  trackName?: string;
  
  // ------------------------------------------------ URLs and Resources ---------------------------------------------//
  @ApiProperty({ description: 'Feed URL' })
  feedUrl?: string;
  
  @ApiProperty({ description: 'Small artwork URL' })
  artworkUrl100?: string;
  
  @ApiProperty({ description: 'Large artwork URL' })
  artworkUrl600?: string;
  
  // ------------------------------------------------ Classification ---------------------------------------------//
  @ApiProperty({ description: 'Primary genre' })
  primaryGenreName?: string;
  
  @ApiProperty({ description: 'List of genres', type: [String] })
  genres?: string[];
  
  @ApiProperty({ description: 'Content type' })
  kind?: string;
}
