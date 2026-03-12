import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentTextIcon,
  SparklesIcon,
  UserIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Squares2X2Icon },
    { name: 'Create Resume', path: '/create', icon: DocumentTextIcon },
    { name: 'My Resumes', path: '/resumes', icon: ClipboardDocumentListIcon },
    { name: 'Templates', path: '/templates', icon: DocumentTextIcon },
    { name: 'AI Assistant', path: '/ai-assistant', icon: SparklesIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-40 border-r border-gray-200 dark:border-gray-800"
      >
        <div className="flex flex-col h-full pt-0">
          {/* Logo/Brand */}
          <div className="px-4 py-4 border-b border-gray-200/80 dark:border-gray-800/80">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <BriefcaseIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Resume Builder</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sign out — at bottom of left menu */}
          <div className="border-t border-gray-200/80 dark:border-gray-800/80 px-3 py-2">
            <button
              type="button"
              onClick={() => { onClose(); logout(); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar; 