import { Controller, Get, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchPodcastDto } from '../dto/search-podcast.dto';
import { PodcastService } from '../services/podcast.service';

// ------------------------------------------------ Controller Configuration ---------------------------------------------//
@ApiTags('podcasts')
@Controller('podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  // ------------------------------------------------ Endpoint For Search ---------------------------------------------//
  @Get('search')
  @ApiOperation({ summary: 'Search for podcasts using iTunes API' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of podcasts matching the search term',
  })
  async searchPodcasts(@Query() searchPodcastDto: SearchPodcastDto) {
    const { term, media } = searchPodcastDto;
    return this.podcastService.searchPodcasts(term, media);
  }

  // ------------------------------------------------ Endpoint to Get All Podcasts ---------------------------------------------//
  @Get('all')
  @ApiOperation({ summary: 'Retrieve all podcasts from the database' })
  @ApiResponse({
    status: 200,
    description: 'Returns all podcasts stored in the database',
  })
  async getAllPodcasts() {
    return this.podcastService.findAllPodcasts();
  }

  // ------------------------------------------------ Endpoint to Clear All Podcasts ---------------------------------------------//
  @Delete('clear')
  @ApiOperation({ summary: 'Clear all podcasts from the database' })
  @ApiResponse({
    status: 200,
    description: 'Clears all podcasts from the database',
  })
  async clearAllPodcasts() {
    return this.podcastService.clearAllPodcasts();
  }
}
