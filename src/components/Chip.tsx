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
  variant = 'default',
  disabled = false 
}: ChipProps) {
  const baseClasses = "rounded-full text-sm font-medium transition-all duration-200 ease-out min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2";
  
  const variantClasses = {
    default: "px-4 py-2",
    compact: "px-3 py-2"
  };
  
  const getStateClasses = () => {
    if (disabled) {
      return "bg-gray-100 text-gray-400 cursor-not-allowed";
    }
    
    return active
      ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 border border-gray-200";
  };

  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${getStateClasses()}`}
      aria-pressed={active}
      aria-label={`${active ? 'Remove' : 'Add'} ${label} filter`}
    >
      {label}
    </button>
  );
}