"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { X, MoreVertical } from "lucide-react";

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
    <div className="w-full max-w-full px-0 search">
      <div className="flex items-center gap-2 w-full">
        <form id="search-bar" onSubmit={handleSubmit} className="flex-1 min-w-0 ml-0 searchbar" style={{ marginLeft: 0 }}>
          <div 
            className={`relative flex w-full items-center rounded-md border ${isFocused ? 'border-[#456C91] ring-1 ring-[#456C91]/30' : 'border-[#2a2b3d]'} bg-transparent transition-colors duration-200`}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search through over 70 million podcasts and episodes..."
              aria-label="Search through over 70 million podcasts and episodes..."
              className="w-full bg-transparent px-[10px] py-[7px] pr-8 text-[14px] text-foreground placeholder:text-muted-foreground outline-none"
              dir="ltr"
            />
            
            {/* Clear Button */}
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
                className="absolute right-2 p-1 rounded-md text-muted-foreground hover:bg-white/10 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>
        <div className="flex items-center">
          <button
            type="button"
            className="mr-[5px] mb-0 block text-[13px] font-medium px-[12px] py-[7px] rounded-md bg-[#456C91] text-white hover:bg-[#4e7ca8] transition-colors"
            aria-label="Log in"
          >
            Log in
          </button>
          <button
            type="button"
            className="mr-[5px] mb-0 block text-[13px] font-medium px-[12px] py-[7px] rounded-md bg-[#456C91] text-white hover:bg-[#4e7ca8] transition-colors"
            aria-label="Sign up"
          >
            Sign up
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md text-foreground hover:bg-white/10 transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
}