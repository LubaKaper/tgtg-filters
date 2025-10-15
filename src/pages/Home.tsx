import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import QuickFilters from '../components/QuickFilters';
import TabsBar from '../components/TabsBar';
import SortBar from '../components/SortBar';
import ActiveFiltersBar from '../components/ActiveFiltersBar';
import ResultCard from '../components/ResultCard';
import FilterDrawer from '../components/FilterDrawer';
import BottomNav from '../components/BottomNav';
import { useFilters } from '../hooks/useFilters';
import { mockResults, type StoreResult } from '../data/mockResults';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [storeData, setStoreData] = useState<StoreResult[]>(mockResults);
  
  const {
    filters,
    applyFilter,
    clearFilter,
    clearAll,
    toggleArrayFilter,
    getFilteredResults,
    getActiveFiltersCount,
    normalizeText,
    isLooseMatch
  } = useFilters();

  const filteredResults = getFilteredResults(storeData);

  const handleQuickFilterChange = (key: string, value: string) => {
    applyFilter(key as any, value);
  };

  const handleFilterDrawerApply = () => {
    // Filter state is already managed by useFilters hook
    setIsFilterDrawerOpen(false);
  };

  const handleToggleFavorite = (storeId: string) => {
    setStoreData(prevData => 
      prevData.map(store => 
        store.id === storeId 
          ? { ...store, isFavorite: !store.isFavorite }
          : store
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[env(safe-area-inset-top)] pb-[calc(5rem+env(safe-area-inset-bottom))]"> {/* Safe area padding for header and bottom nav */}
      {/* Header */}
      <Header />
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto px-4 py-3">
        <SearchBar
          query={filters.query}
          onQueryChange={(query) => applyFilter('query', query)}
          onOpenFilters={() => setIsFilterDrawerOpen(true)}
          onOpenLocation={() => {/* TODO: Location picker */}}
          normalizeText={normalizeText}
          isLooseMatch={isLooseMatch}
        />
      </div>
      
      {/* Quick Filters */}
      <QuickFilters
        activeFilters={{
          pickupDay: filters.pickupDay,
          pickupWindow: filters.pickupWindow
        }}
        onFilterChange={handleQuickFilterChange}
      />
      
      {/* Tabs Bar */}
      <TabsBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Sort Bar */}
      <SortBar 
        sortBy="Relevance"
        onSortChange={(_sort: string) => {/* TODO: Implement sorting */}}
      />
      
      {/* Active Filters Bar */}
      <ActiveFiltersBar
        activeFiltersCount={getActiveFiltersCount}
        filters={filters}
        onClearFilter={(key) => clearFilter(key as any)}
        onClearAll={clearAll}
      />
      
      {/* Results */}
      <div className="max-w-md mx-auto px-4 py-4">
        {activeTab === 'list' ? (
          <div className="space-y-3">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                <div className="text-sm text-gray-600 mb-3">
                  {filteredResults.length} store{filteredResults.length !== 1 ? 's' : ''} found
                </div>
                {filteredResults.map((store) => (
                  <ResultCard
                    key={store.id}
                    store={store}
                    onPress={() => console.log('Store clicked:', store.name)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          // Map view placeholder
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Map View</h3>
            <p className="text-gray-500">Map integration coming soon</p>
          </div>
        )}
      </div>
      
      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        activeFiltersCount={getActiveFiltersCount}
        onFilterChange={(key, value) => applyFilter(key as any, value)}
        onToggleArrayFilter={toggleArrayFilter}
        onClearAll={clearAll}
        onApply={handleFilterDrawerApply}
      />
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}