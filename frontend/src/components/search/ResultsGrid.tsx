import { PodcastCard } from "@/components/podcast/PodcastCard";
import { searchPodcasts, Podcast } from "@/services/api";
import { useEffect, useState } from "react";

interface ResultsGridProps {
  query: string;
}

export function ResultsGrid({ query }: ResultsGridProps) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query || query.trim().length === 0) {
        setPodcasts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchPodcasts(query);
        setPodcasts(response.results);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results. Please try again.');
        setPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const hasResults = podcasts.length > 0;

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-2">جاري البحث...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-2 text-red-500">{error}</p>
      </div>
    );
  }

  if (!hasResults && query.trim().length > 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-2">لا توجد نتائج</p>
        <p className="text-muted-foreground text-sm">جرب البحث بكلمات مختلفة</p>
      </div>
    );
  }

  if (!query || query.trim().length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-2">ابدأ البحث عن البودكاست المفضل لديك</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Podcasts Section */}
      {podcasts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              نتائج البحث لـ &quot;{query}&quot;
            </h2>
            <span className="text-sm text-muted-foreground">
              {podcasts.length} نتيجة
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.collectionId || podcast.id} podcast={podcast} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}