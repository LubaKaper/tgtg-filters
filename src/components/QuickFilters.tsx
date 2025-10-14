import Chip from './Chip';

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
    <div className="max-w-md mx-auto px-4 py-2">
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter, index) => (
          <Chip
            key={index}
            label={filter.label}
            active={isActive(filter.key, filter.value)}
            onToggle={() => handleFilterClick(filter.key, filter.value)}
          />
        ))}
      </div>
    </div>
  );
}