"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="mr-64 min-h-screen">
        {/* Header with Search */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
          <div className="px-8 py-6">
            <SearchBar />
          </div>
        </header>

        {/* Error Content */}
        <div className="px-8 py-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="max-w-md">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold mb-4">حدث خطأ</h1>
              <p className="text-muted-foreground mb-6">
                عذراً، حدث خطأ أثناء تحميل النتائج. يرجى المحاولة مرة أخرى.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  إعادة المحاولة
                </button>
                <button
                  onClick={() => window.location.href = '/search'}
                  className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  العودة للبحث
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
