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
      <Card className="p-2 sm:p-3 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
        {/* Artwork */}
        <div className="relative aspect-square mb-2 overflow-hidden rounded-md">
          <Image
            src={podcast.artworkUrl600}
            alt={podcast.collectionName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="font-semibold text-xs leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {podcast.collectionName}
          </h3>

          {/* Artist */}
          <p className="text-muted-foreground text-xs line-clamp-1">
            {podcast.artistName}
          </p>

          {/* Genre */}
          <div className="flex flex-wrap gap-1">
            <span className="inline-block px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
              {podcast.primaryGenreName}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}