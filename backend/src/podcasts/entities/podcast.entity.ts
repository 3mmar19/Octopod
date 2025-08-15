import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { PodcastBase } from '../models/podcast-base.model';

// ------------------------------------------------ Entity Definition ---------------------------------------------//
@Entity('podcasts')
export class Podcast extends PodcastBase {
  // ------------------------------------------------ Primary Key ---------------------------------------------//
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ------------------------------------------------ Base Properties ---------------------------------------------//
  @Column({ type: 'bigint', nullable: true })
  collectionId: number;

  @Column({ nullable: true })
  artistName: string;

  @Column({ nullable: true })
  collectionName: string;

  @Column({ nullable: true })
  trackName: string;

  @Column({ nullable: true })
  feedUrl: string;

  @Column({ nullable: true })
  artworkUrl100: string;

  @Column({ nullable: true })
  artworkUrl600: string;

  @Column({ nullable: true })
  primaryGenreName: string;

  @Column('simple-array', { nullable: true })
  genres: string[];

  @Column({ nullable: true })
  kind: string;

  // ------------------------------------------------ Entity-Specific Fields ---------------------------------------------//
  @Column({ type: 'bigint', nullable: true })
  trackId: number;

  @Column({ nullable: true })
  searchTerm: string;

  // ------------------------------------------------ Metadata Fields ---------------------------------------------//
  @Index()
  @CreateDateColumn()
  createdAt: Date;
}
