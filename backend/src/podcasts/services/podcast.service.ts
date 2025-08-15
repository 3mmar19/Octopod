import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from '../entities/podcast.entity';
import { ItunesApiService } from './itunes-api.service';
import { SearchPodcastResponseDto, ClearDatabaseResponseDto } from '../dto/podcast-response.dto';
import { ItunesResult } from '../interfaces/itunes-response.interface';

// ------------------------------------------------ Service Definition ---------------------------------------------//
@Injectable()
export class PodcastService {
  private readonly logger = new Logger(PodcastService.name);

  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    private readonly itunesApiService: ItunesApiService,
  ) {}

  // ------------------------------------------------ Search Podcasts ---------------------------------------------//
  async searchPodcasts(term: string, media = 'podcast'): Promise<SearchPodcastResponseDto> {
    // Check if we have cached results for this search term
    const cachedResults = await this.findBySearchTerm(term);
    if (cachedResults.length > 0) {
      this.logger.log(`Found cached results for search term: ${term}`);
      return {
        resultCount: cachedResults.length,
        results: cachedResults,
        source: 'database',
      };
    }

    // If no cached results, fetch from iTunes API
    const itunesResponse = await this.itunesApiService.searchPodcasts(term, media);
    
    // Save results to database
    if (itunesResponse?.results?.length > 0) {
      await this.savePodcasts(itunesResponse.results, term);
    }
    
    // Map iTunes results to our DTO format
    const mappedResults = itunesResponse.results.map(result => ({
      id: undefined, // Will be generated when saved to DB, but needs to be undefined for the DTO
      collectionId: result.collectionId,
      collectionName: result.collectionName,
      artistName: result.artistName,
      trackName: result.trackName,
      feedUrl: result.feedUrl,
      artworkUrl100: result.artworkUrl100,
      artworkUrl600: result.artworkUrl600,
      primaryGenreName: result.primaryGenreName,
      genres: result.genres,
      kind: result.kind
    }));
    
    return {
      resultCount: itunesResponse.resultCount,
      results: mappedResults,
      source: 'api',
    };
  }

  // ------------------------------------------------ Find All Podcasts ---------------------------------------------//
  async findAllPodcasts(): Promise<SearchPodcastResponseDto> {
    this.logger.log('Retrieving all podcasts from database');
    const podcasts = await this.podcastRepository.find({
      order: { createdAt: 'DESC' },
    });

    return {
      resultCount: podcasts.length,
      results: podcasts,
      source: 'database',
    };
  }

  // ------------------------------------------------ Clear All Podcasts ---------------------------------------------//
  async clearAllPodcasts(): Promise<ClearDatabaseResponseDto> {
    this.logger.log('Clearing all podcasts from database');
    try {
      // First check if there are any podcasts to delete
      const count = await this.podcastRepository.count();
      
      if (count === 0) {
        return {
          success: true,
          message: 'Database is already empty',
          affected: 0,
        };
      }

      // Use clear() method instead of delete({}) to avoid empty criteria error
      await this.podcastRepository.clear();
      
      return {
        success: true,
        message: `Successfully cleared ${count} podcasts from database`,
        affected: count,
      };
    } catch (error) {
      this.logger.error(`Error clearing podcasts from database: ${error.message}`);
      return {
        success: false,
        message: `Failed to clear podcasts: ${error.message}`,
      };
    }
  }

  // ------------------------------------------------ Helper Methods ---------------------------------------------//
  private async findBySearchTerm(term: string): Promise<Podcast[]> {
    return this.podcastRepository.find({
      where: { searchTerm: term },
      order: { createdAt: 'DESC' },
    });
  }

  // ------------------------------------------------ Database Operations ---------------------------------------------//
  private async savePodcasts(podcasts: ItunesResult[], searchTerm: string): Promise<void> {
    try {
      this.logger.log(`Saving ${podcasts.length} podcasts to database`);
      
      // Process podcasts one by one to avoid type issues
      for (const podcast of podcasts) {
        const entity = this.podcastRepository.create({
          ...podcast,
          searchTerm,
        });
        
        await this.podcastRepository.save(entity);
      }
      
      this.logger.log(`Successfully saved podcasts for search term: ${searchTerm}`);
    } catch (error) {
      this.logger.error(`Error saving podcasts to database: ${error.message}`);
    }
  }
}
