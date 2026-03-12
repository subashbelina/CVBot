import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = ({ variants, stats }) => {
  return (
    <motion.div
      variants={variants}
      className="dashboard-stats-grid"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dashboard-stat-card bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                {stat.title}
              </p>
              <p className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
                {stat.value}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30 sm:h-11 sm:w-11`}
            >
              <stat.icon
                className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400 sm:h-6 sm:w-6`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsSection;

