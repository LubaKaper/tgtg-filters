import { useState, useRef, useEffect } from 'react';
import { mockResults } from '../data/mockResults';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onFilterClick: () => void;
  normalizeText: (text: string) => string;
  isLooseMatch: (query: string, text: string) => boolean;
}

interface SuggestionItem {
  text: string;
  type: 'name' | 'cuisine' | 'food';
}

export default function SearchBar({ 
  query, 
  onQueryChange, 
  onFilterClick, 
  normalizeText,
  isLooseMatch 
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced fuzzy search with typo tolerance
  useEffect(() => {
    if (query.trim().length > 0) {
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
      
      // Sort suggestions by relevance (exact matches first, then fuzzy)
      const suggestionArray = Array.from(suggestionMap.values())
        .sort((a, b) => {
          const aExact = normalizeText(a.text).includes(normalizedQuery);
          const bExact = normalizeText(b.text).includes(normalizedQuery);
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          return 0;
        })
        .slice(0, 5);
      
      setSuggestions(suggestionArray);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [query, normalizeText, isLooseMatch]);

  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    onQueryChange(suggestion.text);
    setShowSuggestions(false);
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
          <mark className="bg-yellow-200 font-medium">{match}</mark>
          {afterMatch}
        </>
      );
    }
    
    // For fuzzy matches, highlight the whole text with lighter background
    return <span className="bg-yellow-100">{text}</span>;
  };

  return (
    <div className="max-w-md mx-auto px-4 py-3 relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for food, cuisine..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand focus:border-brand min-h-[44px] transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={onFilterClick}
            aria-label="Open filters"
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-4 right-4 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto opacity-100 scale-100 transition-all duration-200 ease-out transform origin-top">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 transition-colors min-h-[44px] ${
                  selectedIndex === index ? 'bg-emerald-50' : 'hover:bg-gray-50'
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