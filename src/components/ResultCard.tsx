import type { StoreResult } from '../data/mockResults';
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface ResultCardProps {
  store: StoreResult;
  onPress?: () => void;
  onToggleFavorite?: (storeId: string) => void;
}

export default function ResultCard({ store, onPress, onToggleFavorite }: ResultCardProps) {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggleFavorite?.(store.id);
  };

  return (
    <div
      onClick={onPress}
      className="rounded-lg bg-white shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md active:scale-[0.99] transition-all duration-200"
    >
      {/* Image with overlays */}
      <div className="relative h-24 bg-gray-100">
        {store.img ? (
          <img src={store.img} alt={store.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            {store.image}
          </div>
        )}
        
        {/* Top left badge */}
        {store.tag && (
          <span
            className="absolute left-2 top-2 z-0 px-2 h-5 flex items-center justify-center rounded-full border border-gray-200 bg-white/90 text-[11px] font-medium text-gray-700"
          >
            {store.tag}
          </span>
        )}

        {/* Top right - Favorite heart */}
        <button
          onClick={handleFavoriteClick}
          aria-label={store.isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 p-1 active:scale-[0.95] transition-transform"
        >
          {store.isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-white stroke-gray-400 stroke-[1.3]" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
        
        {/* Store logo overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
              {store.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 h-24 flex flex-col justify-between">
        {/* Store name */}
        <div className="mb-1">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
            {store.name}
          </h3>
        </div>

        {/* Pickup time */}
        <p className="text-[13px] text-gray-600 mb-2">
          Pick up today {store.pickupWindow}
        </p>

        {/* Bottom row - Distance, Rating, Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Distance */}
            <span className="text-[13px] font-medium text-gray-900">{store.distanceMi} mi</span>
            
            {/* Rating */}
            {store.rating && (
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-[#00715E] rounded flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-gray-900">{store.rating}</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-[11px] text-gray-500 line-through">${store.originalPrice.toFixed(2)}</div>
            <div className="text-[16px] font-bold text-[#00715E]">${store.discountedPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}