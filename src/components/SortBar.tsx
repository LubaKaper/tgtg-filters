import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SortBarProps {
  sortBy: string;
  onSortChange?: (sortBy: string) => void;
}

export default function SortBar({ sortBy = "Relevance", onSortChange }: SortBarProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-2">
      <button
        onClick={() => onSortChange?.(sortBy)}
        className="flex items-center space-x-1 text-sm text-gray-700"
      >
        <span className="font-medium">Sort by:</span>
        <span className="text-teal-600 font-medium">{sortBy}</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
}