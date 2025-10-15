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
      className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md active:scale-[0.99] transition-all duration-200 mb-4"
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
        
        {/* Top left badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {store.tag && (
            <div className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              {store.tag}
            </div>
          )}
        </div>

        {/* Top right - Favorite heart */}
        <button
          onClick={handleFavoriteClick}
          aria-label={store.isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-200"
        >
          {store.isFavorite ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-600" />
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
      <div className="p-4">
        {/* Store name and type */}
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {store.name}
          </h3>
          <p className="text-sm text-gray-600">
            Surprise Bag
          </p>
        </div>

        {/* Pickup time */}
        <p className="text-sm text-gray-600 mb-3">
          Pick up today {store.pickupWindow}
        </p>

        {/* Bottom row - Distance, Rating, Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Distance */}
            <span className="text-sm font-medium text-gray-900">{store.distanceMi} mi</span>
            
            {/* Rating */}
            {store.rating && (
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">{store.rating}</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-xs text-gray-500 line-through">${store.originalPrice.toFixed(2)}</div>
            <div className="text-lg font-bold text-teal-600">${store.discountedPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}