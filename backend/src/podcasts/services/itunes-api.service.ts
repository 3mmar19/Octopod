// ------------------------------------------------ Imports ---------------------------------------------//
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ItunesApiResponse } from '../interfaces/itunes-response.interface';

// ------------------------------------------------ Service Definition ---------------------------------------------//
@Injectable()
export class ItunesApiService {
  // ------------------------------------------------ Service Properties ---------------------------------------------//
  private readonly logger = new Logger(ItunesApiService.name);
  private readonly baseUrl = 'https://itunes.apple.com/search';

  // ------------------------------------------------ API Methods ---------------------------------------------//
  async searchPodcasts(term: string, media = 'podcast'): Promise<ItunesApiResponse> {
    try {
      const encodedTerm = encodeURIComponent(term);
      const url = `${this.baseUrl}?media=${media}&term=${encodedTerm}`;
      
      this.logger.log(`Searching iTunes API for: ${term}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new HttpException(
          `iTunes API returned status: ${response.status}`,
          response.status
        );
      }
      
      const data: ItunesApiResponse = await response.json();
      
      // ------------------------------------------------ Response Validation ---------------------------------------------//
      // Validate response structure
      if (!data || typeof data.resultCount !== 'number' || !Array.isArray(data.results)) {
        throw new HttpException(
          'Invalid response format from iTunes API',
          HttpStatus.BAD_GATEWAY
        );
      }
      
      return data;
    } catch (error) {
      // ------------------------------------------------ Error Handling ---------------------------------------------//
      this.logger.error(`Error searching iTunes API: ${error.message}`);
      
      // Determine appropriate status code
      const statusCode = error instanceof HttpException 
        ? error.getStatus() 
        : HttpStatus.INTERNAL_SERVER_ERROR;
      
      throw new HttpException(
        `Failed to fetch data from iTunes API: ${error.message}`,
        statusCode
      );
    }
  }
}
