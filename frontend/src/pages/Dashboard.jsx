import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { motion } from "framer-motion";
import './dashboard-modern.css';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import { DocumentTextIcon, ChartBarIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import StatsSection from '../components/dashboard/StatsSection';
import QuickActionsSection from '../components/dashboard/QuickActionsSection';
import AnalyticsOverviewSection from '../components/dashboard/AnalyticsOverviewSection';
import YourResumesSection from '../components/dashboard/YourResumesSection';
import RecentResumesSection from '../components/dashboard/RecentResumesSection';
import PopularTemplatesSection from '../components/dashboard/PopularTemplatesSection';

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/api/resumes');
      console.log('Resumes fetched successfully:', response.data);
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError(error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/api/resumes/${id}`);
        setResumes(resumes.filter(resume => resume._id !== id));
        toast.success('Resume deleted successfully');
      } catch (error) {
        console.error('Error deleting resume:', error);
        toast.error(error.response?.data?.message || 'Failed to delete resume');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Mock statistics data - replace with actual data
  const stats = [
    { title: 'Total Resumes', value: resumes.length, icon: DocumentTextIcon, color: 'blue' },
    { title: 'AI Suggestions', value: '12', icon: SparklesIcon, color: 'purple' },
    { title: 'Last Updated', value: '2h ago', icon: ClockIcon, color: 'green' },
    { title: 'Completion Rate', value: '85%', icon: ChartBarIcon, color: 'orange' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-red-500 mb-4">
          <DocumentTextIcon className="h-12 w-12 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchResumes}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="dashboard-modern-bg dashboard-content-layout"
    >
      <WelcomeSection variants={itemVariants} />

      <StatsSection variants={itemVariants} stats={stats} />

      <QuickActionsSection variants={itemVariants} />

      <YourResumesSection variants={itemVariants} resumes={resumes} onDelete={handleDelete} />

      <AnalyticsOverviewSection variants={itemVariants} resumes={resumes} />

      <RecentResumesSection variants={itemVariants} />

      {/* Quick Actions with Enhanced Cards */}
      <motion.div
        variants={itemVariants}
        className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="group dashboard-glass-card hover:shadow-lg transition-all duration-300 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="rounded-full bg-white/15 p-2 mr-3 group-hover:bg-white/25 transition-colors">
                <Plus className="h-5 w-5 text-cyan-300" />
              </div>
              Create a new resume
            </CardTitle>
            <CardDescription className="text-gray-100/80">
              Start from scratch or quickly launch from a template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full dashboard-glass-btn">
              <Link to="/create">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group dashboard-glass-card hover:shadow-lg transition-all duration-300 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="rounded-full bg-white/15 p-2 mr-3 group-hover:bg-white/25 transition-colors">
                <Upload className="h-5 w-5 text-emerald-300" />
              </div>
              Import an existing resume
            </CardTitle>
            <CardDescription className="text-gray-100/80">
              Upload a PDF or DOCX and let the AI convert it into an editable resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full dashboard-glass-btn">
              Import resume
            </Button>
          </CardContent>
        </Card>

        <Card className="group dashboard-glass-card hover:shadow-lg transition-all duration-300 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="rounded-full bg-white/15 p-2 mr-3 group-hover:bg-white/25 transition-colors">
                <Download className="h-5 w-5 text-sky-300" />
              </div>
              Download all resumes
            </CardTitle>
            <CardDescription className="text-gray-100/80">
              Export every version of your resume in a single download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full dashboard-glass-btn">
              Download all
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <PopularTemplatesSection variants={itemVariants} navigate={navigate} />
    </motion.div>
  );
}

export default Dashboard; 