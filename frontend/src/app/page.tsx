"use client";

import { useState, Suspense } from "react";
import { Sidebar, MobileMenuButton } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { Headphones, Search, Star, Zap } from "lucide-react";

export default function Home() {
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
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 relative max-w-7xl mx-auto">
            {/* Mobile Menu Button - positioned in header (left) */}
            <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
              <MobileMenuButton 
                isOpen={isMobileMenuOpen} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
            <Suspense fallback={<div className="w-full max-w-md mx-auto">Loading...</div>}>
              <SearchBar />
            </Suspense>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
          {/* Hero Section with Animation */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 mt-8 sm:mt-12 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="relative z-10 mb-6">
              <div className="inline-block p-2 px-4 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4 animate-fadeIn">
                <span className="flex items-center gap-1">
                  <Headphones className="w-4 h-4" />
                  <span>The best podcast platform</span>
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 relative">
              <span className="relative inline-block animate-fadeInUp">
                OctoPod
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full transform scale-x-0 animate-expandWidth" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}></span>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              Your perfect platform to discover the world of podcasts
            </p>
          </div>

          {/* Feature Cards with Better Visuals */}
          <div id="features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-[#1e1f30] to-[#252640] rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group">
              <div className="bg-primary/10 p-3 rounded-xl inline-block mb-4 text-primary group-hover:bg-primary/20 transition-all duration-300">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Discover
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Search thousands of Arabic and global podcasts and discover new content that matches your interests
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1e1f30] to-[#252640] rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group">
              <div className="bg-primary/10 p-3 rounded-xl inline-block mb-4 text-primary group-hover:bg-primary/20 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Why Octopod?
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                An easy-to-use interface that lets you find your favorite podcasts quickly and easily
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#1e1f30] to-[#252640] rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group sm:col-span-2 lg:col-span-1">
              <div className="bg-primary/10 p-3 rounded-xl inline-block mb-4 text-primary group-hover:bg-primary/20 transition-all duration-300">
                <Star className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Premium Experience
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Enjoy a smooth listening experience with the ability to save your favorite podcasts and access them anytime
              </p>
            </div>
          </div>

          {/* Story Section with Enhanced Visuals */}
          <div id="story" className="bg-gradient-to-br from-[#1e1f30]/80 to-[#252640]/80 rounded-xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 border border-[#2a2b3d]/50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 flex items-center gap-2">
                  <span className="bg-primary/10 p-2 rounded-full text-primary">8</span>
                  <span>Name Story</span>
                </h2>
                <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                  Octo<span className="text-white">Pod</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-[#1e1f30]/80 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 text-primary font-bold rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">01</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Octo</h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">Derived from the Latin word &quot;Octo&quot; meaning 8</p>
                </div>
                
                <div className="bg-[#1e1f30]/80 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 text-primary font-bold rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">02</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Octopus</h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">The octopus that has 8 arms</p>
                </div>
                
                <div className="bg-[#1e1f30]/80 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 text-primary font-bold rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">03</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">The Logo</h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">Composed of a design with 8 sides/elements, reinforcing the association with the number 8</p>
                </div>
                
                <div className="bg-[#1e1f30]/80 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#2a2b3d]/50 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 text-primary font-bold rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">04</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Pod</h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">A direct reference to podcasts, the project&#39;s domain</p>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-[#1e1f30]/60 rounded-xl text-center border border-[#2a2b3d]/30 backdrop-blur-sm">
                <p className="text-white text-sm sm:text-base leading-relaxed">
                  Thus, the name <span className="text-primary font-semibold">OctoPod</span> is clever because it combines the number 8 and the project&#39;s identity with the world of podcasts in one easy-to-pronounce, memorable word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
