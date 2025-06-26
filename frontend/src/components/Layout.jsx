import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { EyeIcon } from '@heroicons/react/24/outline';

function Layout() {
  const [showNav, setShowNav] = useState(true); // shown by default
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* TopNav Eye icon toggle, moved next to sidebar toggle */}
      <button
        onClick={() => setShowNav((prev) => !prev)}
        className="fixed top-4 left-16 z-50 focus:outline-none"
        aria-label="Toggle navigation"
      >
        <EyeIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
      </button>
      {showNav && <TopNav />}
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout; 