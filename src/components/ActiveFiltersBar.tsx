interface ActiveFiltersBarProps {
  activeFiltersCount: number;
  filters: {
    query: string;
    pickupDay: string;
    pickupWindow: string;
    foodTypes: string[];
    diet: string[];
    cuisines: string[];
    distance: number | null;
    price: string | null;
  };
  onClearFilter: (key: string) => void;
  onClearAll: () => void;
}

interface FilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export default function ActiveFiltersBar({ 
  activeFiltersCount, 
  filters, 
  onClearFilter, 
  onClearAll 
}: ActiveFiltersBarProps) {
  if (activeFiltersCount === 0) {
    return null;
  }

  const getFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];

    if (filters.query) {
      chips.push({
        key: 'query',
        label: `"${filters.query.length > 15 ? filters.query.substring(0, 15) + '...' : filters.query}"`,
        onRemove: () => onClearFilter('query')
      });
    }

    if (filters.pickupDay) {
      chips.push({
        key: 'pickupDay',
        label: filters.pickupDay,
        onRemove: () => onClearFilter('pickupDay')
      });
    }

    if (filters.pickupWindow) {
      chips.push({
        key: 'pickupWindow',
        label: filters.pickupWindow,
        onRemove: () => onClearFilter('pickupWindow')
      });
    }

    if (filters.foodTypes.length > 0) {
      if (filters.foodTypes.length === 1) {
        chips.push({
          key: 'foodTypes',
          label: filters.foodTypes[0],
          onRemove: () => onClearFilter('foodTypes')
        });
      } else {
        chips.push({
          key: 'foodTypes',
          label: `${filters.foodTypes.length} food types`,
          onRemove: () => onClearFilter('foodTypes')
        });
      }
    }

    if (filters.diet.length > 0) {
      if (filters.diet.length === 1) {
        chips.push({
          key: 'diet',
          label: filters.diet[0],
          onRemove: () => onClearFilter('diet')
        });
      } else {
        chips.push({
          key: 'diet',
          label: `${filters.diet.length} dietary`,
          onRemove: () => onClearFilter('diet')
        });
      }
    }

    if (filters.cuisines.length > 0) {
      if (filters.cuisines.length === 1) {
        chips.push({
          key: 'cuisines',
          label: filters.cuisines[0],
          onRemove: () => onClearFilter('cuisines')
        });
      } else {
        chips.push({
          key: 'cuisines',
          label: `${filters.cuisines.length} cuisines`,
          onRemove: () => onClearFilter('cuisines')
        });
      }
    }

    if (filters.distance !== null) {
      chips.push({
        key: 'distance',
        label: `Within ${filters.distance} mi`,
        onRemove: () => onClearFilter('distance')
      });
    }

    if (filters.price) {
      chips.push({
        key: 'price',
        label: `Price ${filters.price}`,
        onRemove: () => onClearFilter('price')
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();

  return (
    <div className="max-w-md mx-auto px-4 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
        </span>
        {activeFiltersCount > 1 && (
          <button
            onClick={onClearAll}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <div
            key={chip.key}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-full shadow-sm"
          >
            <span>{chip.label}</span>
            <button
              onClick={chip.onRemove}
              aria-label={`Remove ${chip.label} filter`}
              className="ml-0.5 hover:bg-emerald-700 rounded-full p-1 transition-colors min-h-[20px] min-w-[20px] flex items-center justify-center"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}