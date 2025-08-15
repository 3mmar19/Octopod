"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";  // Third-party hook to delay API calls
import { Input } from "@/components/ui/Input";

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

  return (
    <div className="md:w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-0 md:mr-0 mr-12">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="اكتب مصطلح البحث للبدء"
            className="h-10 sm:h-12 px-3 sm:px-4 text-base sm:text-lg"
            dir="rtl"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                router.push("/search");
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </form>
    </div>
  );
}