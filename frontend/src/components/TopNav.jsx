import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
  DocumentTextIcon,
  UserIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from './theme-provider';

const TopNav = ({ sidebarOpen = false, onToggleSidebar = () => {} }) => {
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notifications = [
    { id: 1, title: 'Resume Updated', message: 'Your resume has been successfully updated', time: '5m ago' },
    { id: 2, title: 'AI Suggestions', message: 'New AI suggestions available for your resume', time: '1h ago' },
  ];

  // Mock search results - replace with actual search functionality
  const searchResults = [
    { id: 1, type: 'resume', title: 'Software Engineer Resume', icon: DocumentTextIcon },
    { id: 2, type: 'template', title: 'Professional Template', icon: BriefcaseIcon },
    { id: 3, type: 'profile', title: 'John Doe Profile', icon: UserIcon },
  ];

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-12 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 z-40">
      <div className="h-full w-full px-3 sm:px-4 flex items-center justify-between gap-3 sm:gap-4">
        {/* Search */}
        <div className="flex-1 min-w-0 max-w-full sm:max-w-md">
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search resumes, templates, profiles..."
                className="w-full pl-9 pr-9 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border-0 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-inset transition-shadow"
              />
              <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-0.5 rounded"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 max-h-80 overflow-y-auto"
                >
                  <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Results</h3>
                  </div>
                  <div>
                    {searchResults.map((result) => (
                      <motion.button
                        key={result.id}
                        whileHover={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}
                        className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors text-left"
                      >
                        <result.icon className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{result.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{result.type}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <div className="px-3 py-1.5 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Press Enter to search</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions: menu toggle, theme, notifications */}
        <div className="flex items-center flex-shrink-0 gap-1">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? (
              <XMarkIcon className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <MoonIcon className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              title="Notifications"
            >
              <BellIcon className="h-5 w-5" strokeWidth={1.5} />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 mt-1.5 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                >
                  <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{notification.message}</p>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav; 