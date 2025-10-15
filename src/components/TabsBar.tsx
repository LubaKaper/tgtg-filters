interface TabsBarProps {
  activeTab: 'list' | 'map';
  onTabChange: (tab: 'list' | 'map') => void;
}

export default function TabsBar({ activeTab, onTabChange }: TabsBarProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-3">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onTabChange('list')}
          aria-label="List view"
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
            activeTab === 'list'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          List
        </button>
        <button
          onClick={() => onTabChange('map')}
          aria-label="Map view"
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
            activeTab === 'map'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Map
        </button>
      </div>
    </div>
  );
}