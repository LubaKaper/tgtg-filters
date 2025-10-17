

interface QuickFiltersProps {
  activeFilters: {
    pickupDay: string;
    pickupWindow: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export default function QuickFilters({ activeFilters, onFilterChange }: QuickFiltersProps) {
  const quickFilters = [
    { key: 'pickupDay', label: 'Today', value: 'Today' },
    { key: 'pickupDay', label: 'Tomorrow', value: 'Tomorrow' },
    { key: 'pickupWindow', label: 'Morning', value: 'Morning' },
    { key: 'pickupWindow', label: 'Lunch', value: 'Lunch' },
    { key: 'pickupWindow', label: 'Evening', value: 'Evening' },
  ];

  const isActive = (key: string, value: string) => {
    return activeFilters[key as keyof typeof activeFilters] === value;
  };

  const handleFilterClick = (key: string, value: string) => {
    const currentValue = activeFilters[key as keyof typeof activeFilters];
    // Toggle: if already active, clear it; otherwise set it
    onFilterChange(key, currentValue === value ? '' : value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {quickFilters.map((filter, index) => (
        <button
          key={index}
          onClick={() => handleFilterClick(filter.key, filter.value)}
          className={`h-10 px-3 rounded-full text-[14px] ${
            isActive(filter.key, filter.value)
              ? 'bg-[#00715E] text-white'
              : 'border border-gray-200 bg-gray-100 text-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}