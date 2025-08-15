import { ApiProperty } from '@nestjs/swagger';
import { PodcastBase } from '../models/podcast-base.model';

export class PodcastResponseDto extends PodcastBase {
  // No need to redeclare properties with decorators as they're inherited from PodcastBase
}

export class SearchPodcastResponseDto {
  @ApiProperty({ description: 'Number of results found' })
  resultCount: number;

  @ApiProperty({ description: 'List of podcasts', type: [PodcastResponseDto] })
  results: PodcastResponseDto[];

  @ApiProperty({ description: 'Source of the results', enum: ['api', 'database'] })
  source: 'api' | 'database';
}

export class ClearDatabaseResponseDto {
  @ApiProperty({ description: 'Whether the operation was successful' })
  success: boolean;

  @ApiProperty({ description: 'Message describing the result' })
  message: string;

  @ApiProperty({ description: 'Number of records affected', required: false })
  affected?: number;
}
