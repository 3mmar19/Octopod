"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar, MobileMenuButton } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { ResultsGrid } from "@/components/search/ResultsGrid";
import { getAllPodcasts, Podcast, clearDatabase } from "@/services/api";
import { PodcastCard } from "@/components/podcast/PodcastCard";

// Featured Podcasts Pagination Component
function FeaturedPodcastsPagination({ podcasts }: { podcasts: Podcast[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 10; // Adjust for responsive grid (2x5 mobile, 3x4 tablet, 5x2 desktop)
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
    <div className="space-y-6">
      {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 5 on desktop */}
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
            Showing {startIndex + 1}-{Math.min(endIndex, podcasts.length)} of {podcasts.length} podcasts
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-muted hover:bg-muted/60 hover:shadow-md hover:scale-105 text-foreground rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              Previous
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
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Create a client component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [clearMessage, setClearMessage] = useState<string | null>(null);
  const [clearSuccess, setClearSuccess] = useState<boolean | null>(null);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const response = await getAllPodcasts();
      setPodcasts(response.results);
      setError(null);
    } catch (err) {
      console.error("Error fetching podcasts:", err);
      setError("Failed to load podcasts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If there's a search query, don't load featured podcasts
    if (query) return;
    
    fetchPodcasts();
  }, [query]);
  
  const handleClearDatabase = async () => {
    try {
      setIsClearing(true);
      setClearMessage(null);
      setClearSuccess(null);
      
      const result = await clearDatabase();
      
      if (result.success) {
        setClearMessage(`Results cleared successfully.${result.affected ? ` Deleted ${result.affected} record(s).` : ''}`);
        setClearSuccess(true);
        // Refresh the podcasts list
        fetchPodcasts();
      } else {
        setClearMessage(`Failed to clear results: ${result.message}`);
        setClearSuccess(false);
      }
    } catch (err) {
      console.error("Error clearing database:", err);
      setClearMessage("An error occurred while attempting to clear results.");
      setClearSuccess(false);
    } finally {
      setIsClearing(false);
    }
  };
  
  return (
    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
      {query ? (
        <ResultsGrid query={query} />
      ) : (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              Discover your favorite podcasts
            </h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto">
              Search thousands of Arabic and global podcasts and discover new content that matches your interests
            </p>
          </div>
          
          {/* Featured Podcasts from Database */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading podcasts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : podcasts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No podcasts available right now</p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                       Latest search results        
                  </h2>
                  <button
                    onClick={handleClearDatabase}
                    disabled={isClearing}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isClearing ? 'Deleting...' : 'Clear search results'}
                  </button>
                </div>
                {clearMessage && (
                  <div className={`p-3 mb-4 rounded-md text-sm ${clearSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {clearMessage}
                  </div>
                )}
                <FeaturedPodcastsPagination podcasts={podcasts} />
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Create a client component for the search bar that uses useSearchParams
function SearchBarWithParams() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  return <SearchBar initialQuery={query} />;
}

export default function SearchPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {/* Header with Search */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm">
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 relative max-w-7xl mx-auto">
            {/* Mobile Menu Button - positioned in header (left) */}
            <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
              <MobileMenuButton 
                isOpen={isMobileMenuOpen} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
            <Suspense fallback={<div className="w-full max-w-md mx-auto">Loading...</div>}>
              <SearchBarWithParams />
            </Suspense>
          </div>
        </header>

        {/* Content Area */}
        <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-7xl mx-auto text-center">Loading...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </div>
  );
}