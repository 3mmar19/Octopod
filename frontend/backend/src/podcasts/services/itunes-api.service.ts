import { Injectable, Logger } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ItunesApiService {
  private readonly logger = new Logger(ItunesApiService.name);
  private readonly baseUrl = 'https://itunes.apple.com/search';

  async searchPodcasts(term: string, media = 'podcast'): Promise<any> {
    try {
      const encodedTerm = encodeURIComponent(term);
      const url = `${this.baseUrl}?media=${media}&term=${encodedTerm}`;
      
      this.logger.log(`Searching iTunes API for: ${term}`);
      const response = await axios.get(url);
      
      return response.data;
    } catch (error) {
      this.logger.error(`Error searching iTunes API: ${error.message}`);
      throw new HttpException(
        `Failed to fetch data from iTunes API: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
