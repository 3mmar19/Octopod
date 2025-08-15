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
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 10; // Adjust for responsive grid (2x5 mobile, 3x4 tablet, 5x2 desktop)

  useEffect(() => {
    const fetchData = async () => {
      if (!query || query.trim().length === 0) {
        setPodcasts([]);
        return;
      }

      setLoading(true);
      setError(null);
      setCurrentPage(1); // Reset to first page on new search

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

  // Pagination calculations
  const totalPages = Math.ceil(podcasts.length / podcastsPerPage);
  const startIndex = (currentPage - 1) * podcastsPerPage;
  const endIndex = startIndex + podcastsPerPage;
  const currentPodcasts = podcasts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

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
          
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {currentPodcasts.map((podcast) => (
              <div key={podcast.collectionId || podcast.id} className="group">
                <PodcastCard podcast={podcast} />
              </div>
            ))}
          </div>

          {/* Enhanced Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="text-sm text-muted-foreground">
                عرض {startIndex + 1}-{Math.min(endIndex, podcasts.length)} من {podcasts.length} نتيجة
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-muted hover:bg-muted/60 hover:shadow-md hover:scale-105 text-foreground rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  السابق
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                        page === currentPage
                          ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                          : 'bg-muted hover:bg-muted/60 hover:shadow-md hover:scale-110 text-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-muted hover:bg-muted/60 hover:shadow-md hover:scale-105 text-foreground rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}