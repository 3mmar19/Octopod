import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPodcastDto {
  @ApiProperty({
    description: 'Search term for podcasts',
    example: 'فنجان',
  })
  @IsNotEmpty()
  @IsString()
  term: string;

  @ApiProperty({
    description: 'Media type to search for',
    default: 'podcast',
    required: false,
  })
  @IsOptional()
  @IsString()
  media?: string = 'podcast';
}
