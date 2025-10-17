import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { mockResults } from '../data/mockResults';

interface SearchBarProps {
  query?: string;
  onQueryChange?: (query: string) => void;
  onFilterClick?: () => void;
  onOpenFilters?: () => void;
  onOpenLocation?: () => void;
  normalizeText?: (text: string) => string;
  isLooseMatch?: (query: string, text: string) => boolean;
}

interface SuggestionItem {
  text: string;
  type: 'name' | 'cuisine' | 'food';
}

// Custom Filter Icon Component (TGTG style sliders)
const FilterSliderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    {/* Top slider */}
    <line x1="4" y1="6" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="10" cy="6" r="2" fill="currentColor"/>
    <line x1="12" y1="6" x2="20" y2="6" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Middle slider */}
    <line x1="4" y1="12" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="14" cy="12" r="2" fill="currentColor"/>
    <line x1="16" y1="12" x2="20" y2="12" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Bottom slider */}
    <line x1="4" y1="18" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="18" r="2" fill="currentColor"/>
    <line x1="10" y1="18" x2="20" y2="18" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function SearchBar({ 
  query = '', 
  onQueryChange, 
  onFilterClick,
  onOpenFilters, 
  onOpenLocation,
  normalizeText,
  isLooseMatch 
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced fuzzy search with typo tolerance
  useEffect(() => {
    if (query.trim().length > 0 && normalizeText && isLooseMatch) {
      const normalizedQuery = normalizeText(query);
      const suggestionMap = new Map<string, SuggestionItem>();
      
      mockResults.forEach(store => {
        const normalizedName = normalizeText(store.name);
        const normalizedCuisine = normalizeText(store.cuisine);
        const normalizedFoodType = normalizeText(store.foodType);
        
        // Check name matches with fuzzy matching
        if (isLooseMatch(normalizedQuery, normalizedName)) {
          suggestionMap.set(store.name, { text: store.name, type: 'name' });
        }
        
        // Check cuisine matches with fuzzy matching
        if (isLooseMatch(normalizedQuery, normalizedCuisine)) {
          suggestionMap.set(store.cuisine, { text: store.cuisine, type: 'cuisine' });
        }
        
        // Check food type matches with fuzzy matching
        if (isLooseMatch(normalizedQuery, normalizedFoodType)) {
          suggestionMap.set(store.foodType, { text: store.foodType, type: 'food' });
        }
      });
      
      // Convert to array and limit results
      const newSuggestions = Array.from(suggestionMap.values()).slice(0, 6);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [query, normalizeText, isLooseMatch]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    onQueryChange?.(suggestion.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    // Try to find exact substring match first
    const exactIndex = text.toLowerCase().indexOf(query.toLowerCase());
    if (exactIndex !== -1) {
      const beforeMatch = text.substring(0, exactIndex);
      const match = text.substring(exactIndex, exactIndex + query.length);
      const afterMatch = text.substring(exactIndex + query.length);
      
      return (
        <>
          {beforeMatch}
          <span className="font-semibold text-[#00715E]">{match}</span>
          {afterMatch}
        </>
      );
    }
    
    // If no exact match found, just return the text
    return text;
  };
  return (
    <div className="relative transform-gpu">
      <div className="flex items-center w-full space-x-1.5" style={{ transform: 'translateZ(0)' }}>
        {/* Search input */}
        <div className="flex items-center flex-1 h-11 rounded-[10px] border border-gray-300 bg-white shadow-sm px-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[15px] text-gray-900 placeholder-gray-500 pl-2"
          />
        </div>

        {/* Filter button */}
        <button
          onClick={onOpenFilters || onFilterClick}
          aria-label="Open filters"
          className="h-11 w-11 inline-flex items-center justify-center rounded-[10px] border border-gray-300 bg-white shadow-sm active:scale-[0.97] transition"
        >
          <FilterSliderIcon className="h-[18px] w-[18px] text-gray-600 stroke-[1.3]" />
        </button>

        {/* Location button */}
        <button
          onClick={onOpenLocation}
          aria-label="Choose location"
          className="h-11 w-11 inline-flex items-center justify-center rounded-[10px] border border-gray-300 bg-white shadow-sm active:scale-[0.97] transition"
        >
          <MapPinIcon className="h-[18px] w-[18px] text-gray-600 stroke-[1.3]" />
        </button>
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-sm border border-gray-200 z-10 max-h-60 overflow-y-auto opacity-100 scale-100 transition-all duration-200 ease-out transform origin-top">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 transition-colors min-h-[44px] ${
                  selectedIndex === index ? 'bg-teal-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="text-sm text-gray-900">
                  {highlightMatch(suggestion.text, query)}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {suggestion.type === 'cuisine' && 'Cuisine'}
                  {suggestion.type === 'food' && 'Food Type'}
                  {suggestion.type === 'name' && 'Restaurant'}
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">No matches found</p>
              <p className="text-xs text-gray-500 mt-1">Try a different name or use filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}