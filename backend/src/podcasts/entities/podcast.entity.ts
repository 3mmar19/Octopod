import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('podcasts')
export class Podcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', nullable: true })
  collectionId: number;

  @Column({ type: 'bigint', nullable: true })
  trackId: number;

  @Column({ nullable: true })
  artistName: string;

  @Column({ nullable: true })
  collectionName: string;

  @Column({ nullable: true })
  trackName: string;

  @Column({ nullable: true })
  collectionCensoredName: string;

  @Column({ nullable: true })
  trackCensoredName: string;

  @Column({ nullable: true })
  artistViewUrl: string;

  @Column({ nullable: true })
  collectionViewUrl: string;

  @Column({ nullable: true })
  feedUrl: string;

  @Column({ nullable: true })
  trackViewUrl: string;

  @Column({ nullable: true })
  artworkUrl30: string;

  @Column({ nullable: true })
  artworkUrl60: string;

  @Column({ nullable: true })
  artworkUrl100: string;

  @Column({ nullable: true })
  artworkUrl600: string;

  @Column({ type: 'decimal', nullable: true })
  collectionPrice: number;

  @Column({ type: 'decimal', nullable: true })
  trackPrice: number;

  @Column({ type: 'decimal', nullable: true })
  collectionHdPrice: number;

  @Column({ nullable: true })
  releaseDate: string;

  @Column({ nullable: true })
  collectionExplicitness: string;

  @Column({ nullable: true })
  trackExplicitness: string;

  @Column({ type: 'int', nullable: true })
  trackCount: number;

  @Column({ type: 'int', nullable: true })
  trackTimeMillis: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  primaryGenreName: string;

  @Column({ nullable: true })
  contentAdvisoryRating: string;

  @Column('simple-array', { nullable: true })
  genreIds: string[];

  @Column('simple-array', { nullable: true })
  genres: string[];

  @Column({ nullable: true })
  wrapperType: string;

  @Column({ nullable: true })
  kind: string;

  @Column({ nullable: true })
  searchTerm: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;
}
