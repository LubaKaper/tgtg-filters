interface TabsBarProps {
  activeTab: 'list' | 'map';
  onTabChange: (tab: 'list' | 'map') => void;
}

export default function TabsBar({ activeTab, onTabChange }: TabsBarProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg border border-gray-200 p-1 mt-2">
      <button
        onClick={() => onTabChange('list')}
        aria-label="List view"
        className={`flex-1 h-9 px-4 rounded-md text-sm font-medium ${
          activeTab === 'list'
            ? 'bg-[#00715E] text-white shadow-sm'
            : 'text-gray-700'
        }`}
      >
        List
      </button>
      <button
        onClick={() => onTabChange('map')}
        aria-label="Map view"
        className={`flex-1 h-9 px-4 rounded-md text-sm font-medium ${
          activeTab === 'map'
            ? 'bg-[#00715E] text-white shadow-sm'
            : 'text-gray-700'
        }`}
      >
        Map
      </button>
    </div>
  );
}