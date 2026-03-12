import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomeSection = ({ variants }) => {
  return (
    <motion.div variants={variants} className="dashboard-welcome-card">
      <div className="absolute inset-0 dashboard-glass-blur" />
      <div className="relative flex flex-col gap-4 min-w-0">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-lg sm:text-3xl md:text-4xl text-white">
            Welcome back!
          </h1>
          <p className="mt-1.5 text-sm text-white/80 font-medium sm:mt-2 sm:text-base">
            Manage your resumes and track your progress
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="secondary" className="dashboard-glass-btn shrink-0">
            <Link to="/create">
              <Plus className="mr-2 h-4 w-4" />
              <span className="sm:hidden">Create</span>
              <span className="hidden sm:inline">Create New Resume</span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;

