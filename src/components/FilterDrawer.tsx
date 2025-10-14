import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { foodTypes, pickupDays, pickupWindows, dietaryOptions, priceBuckets, cuisines } from '../data/taxonomies';

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
  onFilterChange: (key: string, value: any) => void;
  onToggleArrayFilter: (key: 'foodTypes' | 'diet' | 'cuisines', value: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
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
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Filters {(() => {
                      let count = 0;
                      if (filters.pickupDay) count++;
                      if (filters.pickupWindow) count++;
                      if (filters.foodTypes.length > 0) count++;
                      if (filters.diet.length > 0) count++;
                      if (filters.cuisines.length > 0) count++;
                      if (filters.distance !== null) count++;
                      if (filters.price !== null) count++;
                      return count > 0 ? (
                        <span className="text-sm font-normal text-emerald-600">
                          ({count})
                        </span>
                      ) : null;
                    })()}
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
                        <button
                          key={day}
                          onClick={() => onFilterChange('pickupDay', filters.pickupDay === day ? '' : day)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                            filters.pickupDay === day
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup Window */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Pickup Window</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {pickupWindows.map((window) => (
                        <button
                          key={window}
                          onClick={() => onFilterChange('pickupWindow', filters.pickupWindow === window ? '' : window)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                            filters.pickupWindow === window
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {window}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Food Types */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Food Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {foodTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => onToggleArrayFilter('foodTypes', type)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                            filters.foodTypes.includes(type)
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diet Preferences */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Diet Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.slice(0, 3).map((diet) => (
                        <button
                          key={diet}
                          onClick={() => onToggleArrayFilter('diet', diet)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                            filters.diet.includes(diet)
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cuisines */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Cuisines</h4>
                    <div className="flex flex-wrap gap-2">
                      {cuisines.slice(0, 8).map((cuisine) => (
                        <button
                          key={cuisine}
                          onClick={() => onToggleArrayFilter('cuisines', cuisine)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                            filters.cuisines.includes(cuisine)
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                      Distance {filters.distance ? `(${filters.distance} mi)` : '(2.5 mi)'}
                    </h4>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={filters.distance || 2.5}
                        onChange={(e) => onFilterChange('distance', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-emerald-600"
                        style={{
                          background: `linear-gradient(to right, #10b981 0%, #10b981 ${((filters.distance || 2.5) - 0.5) / 4.5 * 100}%, #e5e7eb ${((filters.distance || 2.5) - 0.5) / 4.5 * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0.5</span>
                        <span>1</span>
                        <span>3</span>
                        <span>5 mi</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="filter-section">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Price Range</h4>
                    <div className="flex gap-3">
                      {priceBuckets.map((price) => (
                        <button
                          key={price}
                          onClick={() => onFilterChange('price', filters.price === price ? null : price)}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                            filters.price === price
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {price}
                        </button>
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