import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  PencilSquareIcon,
  ArrowDownTrayIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import PDFExport from '../components/PDFExport';

const ViewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef();

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/resumes/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResume(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    toast.info('Download functionality coming soon!');
  };

  const handleShare = () => {
    // Implement share functionality
    toast.info('Share functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resume not found</h2>
        <p className="text-gray-600 mb-6">The resume you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{resume.title}</h1>
          <div className="flex items-center space-x-3">
            <Link
              to={`/edit/${resume._id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              Edit
            </Link>
            <PDFExport 
              targetRef={resumeRef} 
              filename={`${resume.title || 'resume'}.pdf`}
            />
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div ref={resumeRef} className="space-y-8">
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{resume.sections.personalInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{resume.sections.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{resume.sections.personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{resume.sections.personalInfo.location}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Professional Summary</p>
              <p className="mt-1">{resume.sections.personalInfo.summary}</p>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            {resume.sections.experience.length === 0 ? (
              <p className="text-gray-500">No experience added yet.</p>
            ) : (
              <div className="space-y-4">
                {resume.sections.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {resume.sections.education.length === 0 ? (
              <p className="text-gray-500">No education added yet.</p>
            ) : (
              <div className="space-y-4">
                {resume.sections.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.duration}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            {resume.sections.skills.length === 0 ? (
              <p className="text-gray-500">No skills added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {resume.sections.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewResume; 