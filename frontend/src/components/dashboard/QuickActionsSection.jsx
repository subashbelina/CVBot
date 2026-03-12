import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircleIcon, SparklesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const QuickActionsSection = ({ variants }) => {
  return (
    <motion.div
      variants={variants}
      className="dashboard-section bg-white/95 dark:bg-gray-900/80 rounded-xl shadow-md border border-white/10"
    >
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <Link
          to="/create"
          className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/90 to-indigo-500/90 text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all"
        >
          <PlusCircleIcon className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Create New Resume</span>
            <span className="text-xs opacity-80">Start from a modern template</span>
          </div>
        </Link>
        <Link
          to="/ai-assistant"
          className="flex items-center space-x-3 p-4 rounded-xl bg-purple-50 text-purple-900 dark:bg-purple-900/30 dark:text-purple-100 border border-purple-100 dark:border-purple-700/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
        >
          <SparklesIcon className="h-6 w-6 text-purple-500 dark:text-purple-300" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Get AI Suggestions</span>
            <span className="text-xs text-purple-700/80 dark:text-purple-200/80">
              Improve wording and structure
            </span>
          </div>
        </Link>
        <Link
          to="/templates"
          className="flex items-center space-x-3 p-4 rounded-xl bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100 border border-emerald-100 dark:border-emerald-700/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
        >
          <DocumentTextIcon className="h-6 w-6 text-emerald-500 dark:text-emerald-300" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Browse Templates</span>
            <span className="text-xs text-emerald-700/80 dark:text-emerald-200/80">
              Explore styles for your role
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuickActionsSection;

