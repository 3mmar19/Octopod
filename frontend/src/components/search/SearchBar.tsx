"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const debouncedSearch = useDebouncedCallback((term: string) => {
    if (term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    } else {
      router.push("/search");
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Focus the input when the component mounts
  useEffect(() => {
    if (initialQuery && inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialQuery]);

  return (
    <div className="md:w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-0 md:mr-0 mr-12">
      <form onSubmit={handleSubmit}>
        <div 
          className={`relative flex items-center overflow-hidden rounded-xl border ${isFocused ? 'border-[#3b82f6] shadow-lg ring-2 ring-[#3b82f6]/20' : 'border-[#2a2b3d] shadow-md'} bg-[#1e1f30] transition-all duration-300`}
        >
          {/* Search Icon */}
          <div className="absolute right-4 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="البحث عن قنوات البودكاست"
            className="h-12 sm:h-14 w-full bg-transparent px-4 pr-12 py-2 text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300"
            dir="rtl"
          />
          
          {/* Clear Button with Animation */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                router.push("/search");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              className="absolute left-3 p-1.5 rounded-full bg-[#2a2b3d] hover:bg-[#3a3b4d] text-muted-foreground hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}