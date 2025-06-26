import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/axios';
import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Resumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/api/resumes');
      console.log('Resumes fetched successfully:', response.data);
      setResumes(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError(error.message);
      toast.error('Failed to fetch resumes');
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
        toast.error('Failed to delete resume');
      }
    }
  };

  const handleDownloadPDF = async (id, title) => {
    try {
      const response = await api.get(`/api/resumes/${id}/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title || 'resume'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTemplateDisplayName = (template) => {
    const templateNames = {
      'modern': 'Modern',
      'classic': 'Classic',
      'sidebar': 'Sidebar',
      'creative': 'Creative',
      'minimalist': 'Minimalist',
      'executive': 'Executive'
    };
    return templateNames[template] || template;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center">
          <DocumentTextIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Resumes</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchResumes}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-2">
            Manage and organize your professional resumes
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Go Back
          </button>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Resume
          </Link>
        </div>
      </div>

      {/* Resumes Grid */}
      {resumes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Resumes Yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first professional resume to get started
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Your First Resume
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Resume Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {resume.title || 'Untitled Resume'}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <DocumentTextIcon className="h-4 w-4 mr-1" />
                        {getTemplateDisplayName(resume.template)} Template
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        Created: {formatDate(resume.createdAt)}
                      </div>
                      {resume.updatedAt && resume.updatedAt !== resume.createdAt && (
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          Updated: {formatDate(resume.updatedAt)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resume Content Preview */}
                <div className="p-6">
                  {resume.personalInfo && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Info</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {resume.personalInfo.name && (
                          <p className="font-medium">{resume.personalInfo.name}</p>
                        )}
                        {resume.personalInfo.email && (
                          <p>{resume.personalInfo.email}</p>
                        )}
                        {resume.personalInfo.phone && (
                          <p>{resume.personalInfo.phone}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Experience:</span>
                      <p className="font-medium">
                        {resume.experience ? resume.experience.length : 0} entries
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Education:</span>
                      <p className="font-medium">
                        {resume.education ? resume.education.length : 0} entries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/view/${resume._id}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Link>
                      <Link
                        to={`/edit/${resume._id}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownloadPDF(resume._id, resume.title)}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Stats */}
      {resumes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{resumes.length}</div>
              <div className="text-sm text-gray-600">Total Resumes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {resumes.filter(r => r.template === 'modern').length}
              </div>
              <div className="text-sm text-gray-600">Modern Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {resumes.filter(r => r.template === 'classic').length}
              </div>
              <div className="text-sm text-gray-600">Classic Templates</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 