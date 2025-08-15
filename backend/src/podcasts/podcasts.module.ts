import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastController } from './controllers/podcast.controller';
import { Podcast } from './entities/podcast.entity';
import { ItunesApiService } from './services/itunes-api.service';
import { PodcastService } from './services/podcast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  controllers: [PodcastController],
  providers: [PodcastService, ItunesApiService],
  exports: [PodcastService],
})
export class PodcastsModule {}
