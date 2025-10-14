export default function Header() {
  return (
    <header className="pt-[env(safe-area-inset-top)] bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">TooGoodToGo</h1>
            <p className="text-sm text-gray-500">Save food, save money</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Notification bell */}
            <button 
              aria-label="View notifications"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3.001 3.001 0 11-6 0m6 0H9" />
              </svg>
            </button>
            {/* Profile avatar */}
            <button
              aria-label="View profile"
              className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center text-sm font-medium hover:bg-brand-dark transition-colors min-h-[44px] min-w-[44px]"
            >
              U
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}