import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from '../components/NotificationDropdown';
import { ThemeToggle } from '../components/ui/theme-toggle';
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
import {
  FileText,
  Download,
  Copy,
  Eye,
  Plus,
  Upload,
  BarChart3,
  Users,
  Eye as EyeIcon,
  Clock,
  ArrowUpRight,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './dashboard-modern.css';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import {
  DocumentTextIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ChartBarIcon,
  ClockIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

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
      className="space-y-8 p-4 md:p-6 dashboard-modern-bg"
    >
      {/* Welcome Section with Glassmorphism */}
      <motion.div
        variants={itemVariants}
        className="dashboard-glass-card relative overflow-hidden rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-white/20"
      >
        <div className="absolute inset-0 dashboard-glass-blur" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg">Welcome back!</h1>
            <p className="mt-2 text-primary-100/80 font-medium">Manage your resumes and track your progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <NotificationDropdown />
            <Button asChild variant="secondary" className="dashboard-glass-btn">
              <Link to="/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Resume
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/create"
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <PlusCircleIcon className="h-6 w-6 text-blue-500" />
            <span>Create New Resume</span>
          </Link>
          <Link
            to="/ai-assistant"
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <SparklesIcon className="h-6 w-6 text-purple-500" />
            <span>Get AI Suggestions</span>
          </Link>
          <Link
            to="/templates"
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-100 hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <DocumentTextIcon className="h-6 w-6 text-green-500" />
            <span>Browse Templates</span>
          </Link>
        </div>
      </motion.div>

      {/* User's Resumes List */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-glass-card shadow-2xl">
          <CardHeader>
            <CardTitle>Your Resumes</CardTitle>
            <CardDescription>
              View and manage your resumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-gray-500">No resumes found. Create your first resume!</div>
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
        <Card className="dashboard-glass-card shadow-2xl">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>
              Track your resume performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
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
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Resumes with Enhanced Cards */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Resumes</CardTitle>
            <CardDescription>
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
                      <Card className="group hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center space-x-4">
                              <div className="rounded-xl bg-primary-100 p-3 group-hover:bg-primary-200 transition-colors">
                                <FileText className="h-6 w-6 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Software Engineer Resume</h4>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>Last updated 2 days ago</span>
                                  <span className="mx-2">•</span>
                                  <span>Modern Professional Template</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
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
        className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="rounded-full bg-primary-100 p-2 mr-3 group-hover:bg-primary-200 transition-colors">
                <Plus className="h-5 w-5 text-primary-600" />
              </div>
              Create New Resume
            </CardTitle>
            <CardDescription>
              Start from scratch or use a template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary-600 hover:bg-primary-700">
              <Link to="/create">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="rounded-full bg-green-100 p-2 mr-3 group-hover:bg-green-200 transition-colors">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
              Import Resume
            </CardTitle>
            <CardDescription>
              Upload your existing resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-2 hover:bg-green-50 hover:border-green-200">
              Import
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3 group-hover:bg-blue-200 transition-colors">
                <Download className="h-5 w-5 text-blue-600" />
              </div>
              Download All
            </CardTitle>
            <CardDescription>
              Get all your resumes in one click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-2 hover:bg-blue-50 hover:border-blue-200">
              Download
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Templates with Enhanced Cards */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
            <CardDescription>
              Choose from our most popular resume templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((template) => (
                <motion.div
                  key={template}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 mb-4 group-hover:from-primary-100 group-hover:to-primary-200 transition-colors" />
                      <h4 className="text-sm font-medium">Professional Template</h4>
                      <p className="text-sm text-muted-foreground">
                        Perfect for corporate roles
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart3 className="mr-1 h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">4.8 (120)</span>
                        </div>
                        <Button variant="link" className="text-primary-600 hover:text-primary-700">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Templates with Enhanced Cards */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-glass-card shadow-2xl">
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
            <CardDescription>
              Click a template to start your resume with that style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8 flex-wrap">
              <button
                onClick={() => navigate('/create?template=modern')}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-32 h-20 rounded-lg border-2 border-primary-600 bg-gradient-to-br from-primary-200 to-primary-400 group-hover:scale-105 transition-transform" />
                <span className="mt-2 text-primary-700 font-semibold">Modern</span>
              </button>
              <button
                onClick={() => navigate('/create?template=classic')}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-32 h-20 rounded-lg border-2 border-gray-400 bg-gradient-to-br from-gray-200 to-gray-400 group-hover:scale-105 transition-transform" />
                <span className="mt-2 text-gray-700 font-semibold">Classic</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard; 