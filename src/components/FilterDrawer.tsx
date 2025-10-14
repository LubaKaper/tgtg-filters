import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { foodTypes, pickupDays, pickupWindows, dietaryOptions, priceBuckets, cuisines } from '../data/taxonomies';
import Chip from './Chip';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    pickupDay: string;
    pickupWindow: string;
    foodTypes: string[];
    diet: string[];
    cuisines: string[];
    distance: number | null;
    price: string | null;
  };
  activeFiltersCount: number;
  onFilterChange: (key: string, value: any) => void;
  onToggleArrayFilter: (key: 'foodTypes' | 'diet' | 'cuisines', value: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  activeFiltersCount,
  onFilterChange,
  onToggleArrayFilter,
  onClearAll,
  onApply
}: FilterDrawerProps) {
  // TODO: wire up filter drawer state
  
  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleClearAll = () => {
    onClearAll();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200 transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500 transition-all"
              enterFrom="opacity-0 translate-y-full scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-300 transition-all"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-full scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-2xl bg-white text-left align-middle shadow-xl transition-all pb-[env(safe-area-inset-bottom)]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Filters {activeFiltersCount > 0 && (
                      <span className="text-sm font-normal text-emerald-600">
                        ({activeFiltersCount})
                      </span>
                    )}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    aria-label="Close filters"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Filter Content */}
                <div className="max-h-96 overflow-y-auto px-6 py-4 space-y-8">
                  {/* Pickup Day */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Pickup Day</h4>
                    <div className="flex gap-3">
                      {pickupDays.map((day) => (
                        <Chip
                          key={day}
                          label={day}
                          active={filters.pickupDay === day}
                          onToggle={() => onFilterChange('pickupDay', filters.pickupDay === day ? '' : day)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pickup Window */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Pickup Window</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {pickupWindows.map((window) => (
                        <Chip
                          key={window}
                          label={window}
                          active={filters.pickupWindow === window}
                          onToggle={() => onFilterChange('pickupWindow', filters.pickupWindow === window ? '' : window)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Food Types */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Food Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {foodTypes.map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          active={filters.foodTypes.includes(type)}
                          onToggle={() => onToggleArrayFilter('foodTypes', type)}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Diet Preferences */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Diet Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.slice(0, 3).map((diet) => (
                        <Chip
                          key={diet}
                          label={diet}
                          active={filters.diet.includes(diet)}
                          onToggle={() => onToggleArrayFilter('diet', diet)}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Cuisines */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Cuisines</h4>
                    <div className="flex flex-wrap gap-2">
                      {cuisines.slice(0, 8).map((cuisine) => (
                        <Chip
                          key={cuisine}
                          label={cuisine}
                          active={filters.cuisines.includes(cuisine)}
                          onToggle={() => onToggleArrayFilter('cuisines', cuisine)}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="filter-section">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Distance</h4>
                      <span className="text-sm text-gray-600 font-medium">
                        ≤ {filters.distance || 2.5} mi
                      </span>
                    </div>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="0.5"
                          max="5"
                          step="0.5"
                          value={filters.distance || 2.5}
                          onChange={(e) => onFilterChange('distance', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                          style={{
                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${((filters.distance || 2.5) - 0.5) / 4.5 * 100}%, #e5e7eb ${((filters.distance || 2.5) - 0.5) / 4.5 * 100}%, #e5e7eb 100%)`
                          }}
                          aria-label="Distance filter"
                          aria-valuemin={0.5}
                          aria-valuemax={5}
                          aria-valuenow={filters.distance || 2.5}
                          aria-valuetext={`${filters.distance || 2.5} miles`}
                        />
                        <style dangerouslySetInnerHTML={{
                          __html: `
                            input[type="range"]::-webkit-slider-thumb {
                              appearance: none;
                              height: 20px;
                              width: 20px;
                              border-radius: 50%;
                              background: #10b981;
                              border: 2px solid #ffffff;
                              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                              cursor: pointer;
                              transition: all 0.2s ease;
                            }
                            input[type="range"]::-webkit-slider-thumb:hover {
                              background: #059669;
                              transform: scale(1.1);
                            }
                            input[type="range"]::-moz-range-thumb {
                              height: 20px;
                              width: 20px;
                              border-radius: 50%;
                              background: #10b981;
                              border: 2px solid #ffffff;
                              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                              cursor: pointer;
                              transition: all 0.2s ease;
                            }
                            input[type="range"]::-moz-range-thumb:hover {
                              background: #059669;
                              transform: scale(1.1);
                            }
                          `
                        }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-3 px-1">
                        <span className="text-center">0.5</span>
                        <span className="text-center">1</span>
                        <span className="text-center">3</span>
                        <span className="text-center">5 mi</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Price Range</h4>
                    <div className="flex gap-3">
                      {priceBuckets.map((price) => (
                        <Chip
                          key={price}
                          label={price}
                          active={filters.price === price}
                          onToggle={() => onFilterChange('price', filters.price === price ? null : price)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer - Sticky */}
                <div className="sticky bottom-0 flex items-center justify-between p-6 border-t border-gray-200 bg-white">
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors underline min-h-[44px] px-2"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApply}
                    className="px-8 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-700 transition-colors shadow-lg min-h-[44px]"
                  >
                    Apply Filters
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}