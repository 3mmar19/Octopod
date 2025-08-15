"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar, MobileMenuButton } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { ResultsGrid } from "@/components/search/ResultsGrid";
import { getAllPodcasts, Podcast, clearDatabase } from "@/services/api";
import { PodcastCard } from "@/components/podcast/PodcastCard";

// Create a client component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [clearMessage, setClearMessage] = useState<string | null>(null);

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
      
      const result = await clearDatabase();
      
      if (result.success) {
        setClearMessage(`تم مسح قاعدة البيانات بنجاح. ${result.affected ? `تم حذف ${result.affected} سجل.` : ''}`);
        // Refresh the podcasts list
        fetchPodcasts();
      } else {
        setClearMessage(`فشل مسح قاعدة البيانات: ${result.message}`);
      }
    } catch (err) {
      console.error("Error clearing database:", err);
      setClearMessage("حدث خطأ أثناء محاولة مسح قاعدة البيانات.");
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
              اكتشف البودكاست المفضل لديك
            </h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto">
              ابحث في آلاف البودكاست العربية والعالمية واكتشف محتوى جديد يناسب اهتماماتك
            </p>
          </div>
          
          {/* Featured Podcasts from Database */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">جاري تحميل البودكاست...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : podcasts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد بودكاست متاحة حالياً</p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                       النتائج الأخيرة لعمليات البحث        
                  </h2>
                  <button
                    onClick={handleClearDatabase}
                    disabled={isClearing}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isClearing ? 'جاري المسح...' : 'مسح قاعدة البيانات'}
                  </button>
                </div>
                {clearMessage && (
                  <div className={`p-3 mb-4 rounded-md text-sm ${clearMessage.includes('بنجاح') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {clearMessage}
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {podcasts.map((podcast) => (
                    <PodcastCard key={podcast.collectionId || podcast.id} podcast={podcast} />
                  ))}
                </div>
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
      <main className="md:mr-64 min-h-screen">
        {/* Header with Search */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 relative max-w-7xl mx-auto">
            {/* Mobile Menu Button - positioned in header */}
            <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2">
              <MobileMenuButton 
                isOpen={isMobileMenuOpen} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
            <Suspense fallback={<div className="w-full max-w-md mx-auto">جاري التحميل...</div>}>
              <SearchBarWithParams />
            </Suspense>
          </div>
        </header>

        {/* Content Area */}
        <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-7xl mx-auto text-center">جاري التحميل...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </div>
  );
}