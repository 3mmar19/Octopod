import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface Podcast {
  id?: string;
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  artworkUrl100: string;
  primaryGenreName: string;
  genres: string[];
  kind?: string;
}

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <div className="group cursor-pointer">
      <Card className="p-3 sm:p-4 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
        {/* Artwork */}
        <div className="relative aspect-square mb-2 sm:mb-3 overflow-hidden rounded-md">
          <Image
            src={podcast.artworkUrl600}
            alt={podcast.collectionName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-xs sm:text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {podcast.collectionName}
          </h3>

          {/* Artist */}
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1">
            {podcast.artistName}
          </p>

          {/* Genre */}
          <div className="flex flex-wrap gap-1">
            <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted text-muted-foreground text-xs rounded-full">
              {podcast.primaryGenreName}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}