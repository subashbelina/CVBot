import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  DocumentTextIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  LanguageIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import ResumeTemplateModern from '../components/ResumeTemplateModern';
import ResumeTemplateClassic from '../components/ResumeTemplateClassic';
import ResumeTemplateSidebar from '../components/ResumeTemplateSidebar';
import ResumeTemplateCreative from '../components/ResumeTemplateCreative';
import ResumeTemplateMinimalist from '../components/ResumeTemplateMinimalist';
import ResumeTemplateExecutive from '../components/ResumeTemplateExecutive';
import PDFExport from '../components/PDFExport';
import axios from 'axios';
import { toast } from 'react-toastify';

const sections = [
  { id: 'personal', name: 'Personal Info', icon: UserIcon },
  { id: 'experience', name: 'Work Experience', icon: BriefcaseIcon },
  { id: 'education', name: 'Education', icon: AcademicCapIcon },
  { id: 'skills', name: 'Skills', icon: StarIcon },
  { id: 'languages', name: 'Languages', icon: LanguageIcon },
];

const EditResume = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    template: 'modern', // default template
  });
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef();

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addItem = (section) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/resumes/${id}`, resumeData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Resume saved!');
    } catch (error) {
      toast.error('Failed to save resume');
    }
  };

  // Render the selected template for preview
  const renderSelectedTemplate = () => {
    const template = resumeData.template || 'modern';
    // Map 'personal' to 'personalInfo' for preview
    const previewData = {
      ...resumeData,
      personalInfo: resumeData.personal,
    };
    if (template === 'modern') return <ResumeTemplateModern resume={previewData} />;
    if (template === 'classic') return <ResumeTemplateClassic resume={previewData} />;
    if (template === 'sidebar') return <ResumeTemplateSidebar resume={previewData} />;
    if (template === 'creative') return <ResumeTemplateCreative resume={previewData} />;
    if (template === 'minimalist') return <ResumeTemplateMinimalist resume={previewData} />;
    if (template === 'executive') return <ResumeTemplateExecutive resume={previewData} />;
    return <ResumeTemplateModern resume={previewData} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Resume</h1>
                <p className="text-sm text-gray-500">Create your professional resume</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <EyeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Preview
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
              <div className="flex space-x-2">
                <PDFExport 
                  targetRef={previewRef} 
                  filename={`${resumeData.personal.fullName || 'resume'}.pdf`}
                />
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
            <div ref={previewRef} className="bg-white">
              {renderSelectedTemplate()}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg
                    ${activeSection === section.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <section.icon
                    className={`-ml-1 mr-3 h-5 w-5 ${
                      activeSection === section.id ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  />
                  {section.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {sections.find(s => s.id === activeSection)?.name}
                </h2>
              </div>
              <div className="p-6">
                {activeSection === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={resumeData.personal.fullName}
                          onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Professional Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={resumeData.personal.title}
                          onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={resumeData.personal.email}
                          onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={resumeData.personal.phone}
                          onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={resumeData.personal.location}
                        onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                        Professional Summary
                      </label>
                      <textarea
                        id="summary"
                        rows={4}
                        value={resumeData.personal.summary}
                        onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'experience' && (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  value={exp.company || ''}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience];
                                    newExp[index] = { ...newExp[index], company: e.target.value };
                                    setResumeData({ ...resumeData, experience: newExp });
                                  }}
                                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Position
                                </label>
                                <input
                                  type="text"
                                  value={exp.position || ''}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience];
                                    newExp[index] = { ...newExp[index], position: e.target.value };
                                    setResumeData({ ...resumeData, experience: newExp });
                                  }}
                                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Start Date
                                </label>
                                <input
                                  type="date"
                                  value={exp.startDate || ''}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience];
                                    newExp[index] = { ...newExp[index], startDate: e.target.value };
                                    setResumeData({ ...resumeData, experience: newExp });
                                  }}
                                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  End Date
                                </label>
                                <input
                                  type="date"
                                  value={exp.endDate || ''}
                                  onChange={(e) => {
                                    const newExp = [...resumeData.experience];
                                    newExp[index] = { ...newExp[index], endDate: e.target.value };
                                    setResumeData({ ...resumeData, experience: newExp });
                                  }}
                                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Description
                              </label>
                              <textarea
                                rows={3}
                                value={exp.description || ''}
                                onChange={(e) => {
                                  const newExp = [...resumeData.experience];
                                  newExp[index] = { ...newExp[index], description: e.target.value };
                                  setResumeData({ ...resumeData, experience: newExp });
                                }}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem('experience', index)}
                            className="ml-4 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove experience</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem('experience')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Add Experience
                    </button>
                  </div>
                )}

                {/* Similar sections for education, skills, and languages */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResume; 