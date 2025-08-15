import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from '../entities/podcast.entity';
import { ItunesApiService } from './itunes-api.service';

@Injectable()
export class PodcastService {
  private readonly logger = new Logger(PodcastService.name);

  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    private readonly itunesApiService: ItunesApiService,
  ) {}

  async searchPodcasts(term: string, media = 'podcast'): Promise<any> {
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
    
    return {
      ...itunesResponse,
      source: 'api',
    };
  }

  async findAllPodcasts(): Promise<any> {
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

  async clearAllPodcasts(): Promise<any> {
    this.logger.log('Clearing all podcasts from database');
    try {
      const deleteResult = await this.podcastRepository.delete({});
      return {
        success: true,
        message: `Successfully cleared ${deleteResult.affected} podcasts from database`,
        affected: deleteResult.affected,
      };
    } catch (error) {
      this.logger.error(`Error clearing podcasts from database: ${error.message}`);
      return {
        success: false,
        message: `Failed to clear podcasts: ${error.message}`,
      };
    }
  }

  private async findBySearchTerm(term: string): Promise<Podcast[]> {
    return this.podcastRepository.find({
      where: { searchTerm: term },
      order: { createdAt: 'DESC' },
    });
  }

  private async savePodcasts(podcasts: any[], searchTerm: string): Promise<void> {
    try {
      this.logger.log(`Saving ${podcasts.length} podcasts to database`);
      
      // Save podcasts one by one to avoid type issues
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
