import { useState, useMemo } from 'react';
import type { StoreResult } from '../data/mockResults';

export interface FilterState {
  query: string;
  pickupDay: string;
  pickupWindow: string;
  foodTypes: string[];
  diet: string[];
  cuisines: string[];
  distance: number | null;
  price: string | null;
}

const initialState: FilterState = {
  query: '',
  pickupDay: '',
  pickupWindow: '',
  foodTypes: [],
  diet: [],
  cuisines: [],
  distance: null,
  price: null,
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const applyFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key: keyof FilterState) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'foodTypes' || key === 'diet' || key === 'cuisines' ? [] : key === 'distance' ? null : ''
    }));
  };

  const clearAll = () => {
    setFilters(initialState);
  };

  const toggleArrayFilter = (key: 'foodTypes' | 'diet' | 'cuisines', value: string) => {
    setFilters(prev => {
      const currentArray = prev[key];
      const isSelected = currentArray.includes(value);
      
      return {
        ...prev,
        [key]: isSelected 
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "") // Remove diacritics
      .replace(/[^a-z0-9]/g, ''); // Keep only alphanumeric
  };

  // Basic typo tolerance: allow one missing/extra character
  const isLooseMatch = (normalizedQuery: string, normalizedText: string): boolean => {
    if (normalizedText.includes(normalizedQuery)) return true;
    
    const lengthDiff = Math.abs(normalizedQuery.length - normalizedText.length);
    if (lengthDiff > 1) return false;
    
    // Check for single character difference
    const shorter = normalizedQuery.length < normalizedText.length ? normalizedQuery : normalizedText;
    const longer = normalizedQuery.length >= normalizedText.length ? normalizedQuery : normalizedText;
    
    let differences = 0;
    let i = 0, j = 0;
    
    while (i < shorter.length && j < longer.length) {
      if (shorter[i] !== longer[j]) {
        differences++;
        if (differences > 1) return false;
        if (shorter.length === longer.length) {
          i++; j++;
        } else {
          j++; // skip character in longer string
        }
      } else {
        i++; j++;
      }
    }
    
    return differences <= 1;
  };

  const isActive = (filterKey: keyof FilterState): boolean => {
    const value = filters[filterKey];
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== '';
  };

  const activeCount = (): number => {
    return getActiveFiltersCount;
  };

  const getFilteredResults = (results: StoreResult[]): StoreResult[] => {
    return results.filter(store => {
      // Query filter with fuzzy search
      if (filters.query) {
        const normalizedQuery = normalizeText(filters.query);
        const normalizedName = normalizeText(store.name);
        const normalizedCuisine = normalizeText(store.cuisine);
        
        if (!normalizedName.includes(normalizedQuery) && 
            !normalizedCuisine.includes(normalizedQuery)) {
          return false;
        }
      }

      // Pickup day filter
      if (filters.pickupDay && store.pickupDay !== filters.pickupDay) {
        return false;
      }

      // Pickup window filter
      if (filters.pickupWindow && store.pickupWindow !== filters.pickupWindow) {
        return false;
      }

      // Food types filter
      if (filters.foodTypes.length > 0 && !filters.foodTypes.includes(store.foodType)) {
        return false;
      }

      // Diet filter
      if (filters.diet.length > 0) {
        const hasMatchingDiet = filters.diet.some(dietReq => 
          store.dietary.includes(dietReq)
        );
        if (!hasMatchingDiet) {
          return false;
        }
      }

      // Cuisine filter
      if (filters.cuisines.length > 0 && !filters.cuisines.includes(store.cuisine)) {
        return false;
      }

      // Distance filter
      if (filters.distance !== null && store.distanceMi > filters.distance) {
        return false;
      }

      // Price filter
      if (filters.price && store.priceBucket !== filters.price) {
        return false;
      }

      return true;
    });
  };

  const getActiveFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.query) count++;
    if (filters.pickupDay) count++;
    if (filters.pickupWindow) count++;
    if (filters.foodTypes.length > 0) count++;
    if (filters.diet.length > 0) count++;
    if (filters.distance !== null) count++;
    if (filters.price) count++;
    return count;
  }, [filters]);

  return {
    filters,
    applyFilter,
    clearFilter,
    clearAll,
    toggleArrayFilter,
    getFilteredResults,
    getActiveFiltersCount,
    normalizeText,
    isLooseMatch,
    isActive,
    activeCount
  };
};