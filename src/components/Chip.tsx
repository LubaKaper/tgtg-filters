interface ChipProps {
  label: string;
  active: boolean;
  onToggle: () => void;
  variant?: 'default' | 'compact';
  disabled?: boolean;
}

export default function Chip({ 
  label, 
  active, 
  onToggle, 
  disabled = false 
}: ChipProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`h-10 px-3 rounded-full text-[14px] min-h-[44px] flex items-center justify-center transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#00715E] focus:ring-offset-2 ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : active
          ? "bg-[#00715E] text-white"
          : "border border-gray-200 bg-gray-100 text-gray-700"
      }`}
      aria-pressed={active}
      aria-label={`${active ? 'Remove' : 'Add'} ${label} filter`}
    >
      {label}
    </button>
  );
}