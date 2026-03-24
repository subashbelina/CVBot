import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { FileText, Download, Copy, Eye, Plus, Upload, BarChart3, Users, Eye as EyeIcon, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
import './dashboard-modern.css';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import { DocumentTextIcon, PlusCircleIcon, PencilSquareIcon, TrashIcon, ChartBarIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import StatsSection from '../components/dashboard/StatsSection';
import QuickActionsSection from '../components/dashboard/QuickActionsSection';

function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
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

  // Sample data for the chart
  const chartData = [
    { name: 'Jan', views: 400, downloads: 240 },
    { name: 'Feb', views: 300, downloads: 139 },
    { name: 'Mar', views: 200, downloads: 980 },
    { name: 'Apr', views: 278, downloads: 390 },
    { name: 'May', views: 189, downloads: 480 },
    { name: 'Jun', views: 239, downloads: 380 },
  ];

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

      {/* User's Resumes List */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-glass-card shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-white">Your Resumes</CardTitle>
            <CardDescription className="text-gray-100/80">
              View and manage your resumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-gray-100/70">
                No resumes found. Create your first resume!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                  >
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">{resume.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Template: {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}
                      </p>
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <Link
                          to={`/edit/${resume._id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(resume._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Chart with Glassmorphism */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-glass-card shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-white">Analytics Overview</CardTitle>
            <CardDescription className="text-gray-100/80">
              Track your resume performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {/* <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#00e0ff"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#00e0ff', strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="downloads"
                    stroke="#ff00ea"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#ff00ea', strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer> */}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Resumes with Enhanced Cards */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-glass-card shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-white">Recent Resumes</CardTitle>
            <CardDescription className="text-gray-100/80">
              View and manage your recent resumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <AnimatePresence>
                  {[1, 2, 3].map((resume) => (
                    <motion.div
                      key={resume}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="group bg-white/95 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-700/80 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4 sm:p-5 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center space-x-4">
                              <div className="rounded-xl bg-primary-100 p-3 group-hover:bg-primary-200 transition-colors">
                                <FileText className="h-6 w-6 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  Software Engineer Resume
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>Last updated 2 days ago</span>
                                  <span className="mx-2">•</span>
                                  <span>Modern Professional Template</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Active
                              </span>
                              <Button variant="ghost" size="icon" className="hover:bg-primary-100">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hover:bg-primary-100">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hover:bg-primary-100">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

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

      {/* Popular Templates */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-glass-card shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-white">Popular Templates</CardTitle>
            <CardDescription className="text-gray-100/80">
              Click a template to start your resume with that style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <button
                onClick={() => navigate('/create?template=modern')}
                className="group text-left rounded-xl border border-cyan-200/40 bg-white/10 p-4 hover:bg-white/15 hover:border-cyan-300/70 transition-all"
              >
                <div className="aspect-[16/10] rounded-lg border border-cyan-300/60 bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300 mb-3" />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-cyan-100">Modern</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-100 border border-cyan-300/40">
                    ATS Friendly
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-100/85">
                  Clean layout with strong hierarchy for tech and product roles.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-200/80">Most used this week</span>
                  <span className="text-sm text-cyan-200 group-hover:text-cyan-100">Use template →</span>
                </div>
              </button>

              <button
                onClick={() => navigate('/create?template=classic')}
                className="group text-left rounded-xl border border-slate-200/40 bg-white/10 p-4 hover:bg-white/15 hover:border-slate-300/70 transition-all"
              >
                <div className="aspect-[16/10] rounded-lg border border-slate-300/60 bg-gradient-to-br from-gray-100 via-slate-200 to-zinc-300 mb-3" />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-100">Classic</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-500/20 text-slate-100 border border-slate-300/40">
                    Traditional
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-100/85">
                  Professional and timeless style for business and admin roles.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-200/80">Great for conservative industries</span>
                  <span className="text-sm text-slate-200 group-hover:text-slate-100">Use template →</span>
                </div>
              </button>
            </div>

            <div className="mt-5">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate('/templates')}
              >
                Browse all templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard; 