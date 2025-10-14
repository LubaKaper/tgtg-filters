import { useState } from 'react';
import type { StoreResult } from '../data/mockResults';

interface ResultCardProps {
  store: StoreResult;
  onPress?: () => void;
  onToggleFavorite?: (storeId: string) => void;
}

export default function ResultCard({ store, onPress, onToggleFavorite }: ResultCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  
  const discountPercent = Math.round(
    ((store.originalPrice - store.discountedPrice) / store.originalPrice) * 100
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsFavorited(!isFavorited);
    onToggleFavorite?.(store.id);
  };

  return (
    <div
      onClick={onPress}
      className="rounded-lg shadow-sm border bg-white p-4 cursor-pointer hover:shadow-md active:scale-[0.99] transition-all duration-200 min-h-[44px] relative"
    >
      <div className="flex items-start space-x-3">
        {/* Store image with tag */}
        <div className="flex-shrink-0 relative">
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-2xl">
            {store.img ? (
              <img src={store.img} alt={store.name} className="w-full h-full object-cover rounded-md" />
            ) : (
              store.image
            )}
          </div>
          {/* Tag badge */}
          {store.tag && (
            <div className="absolute -top-1 -left-1 px-1.5 py-0.5 bg-emerald-600 text-white text-xs font-medium rounded-sm">
              {store.tag}
            </div>
          )}
        </div>
        
        {/* Store details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {store.name}
              </h3>
              <p className="text-xs text-emerald-600 font-medium">
                Surprise Bag
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {store.distanceMi} mi • {store.priceBucket} • {store.pickupWindow}
              </p>
              
              {/* Dietary badges */}
              {store.dietary.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {store.dietary.slice(0, 2).map((diet, index) => (
                    <span
                      key={index}
                      className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-sm"
                    >
                      {diet}
                    </span>
                  ))}
                  {store.dietary.length > 2 && (
                    <span className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-sm">
                      +{store.dietary.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Favorite heart icon */}
            <button
              onClick={handleFavoriteClick}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ml-2"
            >
              <svg 
                className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                fill={isFavorited ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          {/* Pickup info and rating */}
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-500">
              <span className="inline-flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {store.pickupDay} {store.pickupWindow}
              </span>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{store.rating}</span>
            </div>
          </div>
          
          {/* Pricing */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-emerald-600">
                ${store.discountedPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${store.originalPrice}
              </span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                {discountPercent}% off
              </span>
            </div>
            
            <div className="text-xs text-gray-500">
              {store.itemsLeft} left
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}