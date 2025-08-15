import { Sidebar } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";

export default function Loading() {
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

        {/* Loading Content */}
        <div className="px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
            <Skeleton className="h-8 w-48" />
          </div>
          
          {/* Loading Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="aspect-square mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
