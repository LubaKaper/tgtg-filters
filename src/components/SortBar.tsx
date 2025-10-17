import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SortBarProps {
  sortBy: string;
  onSortChange?: (sortBy: string) => void;
}

export default function SortBar({ sortBy = "Relevance", onSortChange }: SortBarProps) {
  return (
    <div className="flex items-center justify-between text-[13px] text-gray-600">
      <button
        onClick={() => onSortChange?.(sortBy)}
        className="flex items-center"
      >
        <span className="font-medium">Sort by:</span>
        <span className="text-[#00715E] font-medium ml-1">{sortBy}</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-500 ml-1" />
      </button>
    </div>
  );
}