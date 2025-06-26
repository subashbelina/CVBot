import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PlusIcon, TrashIcon, EyeIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import ResumeTemplateModern from '../components/ResumeTemplateModern';
import ResumeTemplateClassic from '../components/ResumeTemplateClassic';
import ResumeTemplateSidebar from '../components/ResumeTemplateSidebar';
import ResumeTemplateCreative from '../components/ResumeTemplateCreative';
import ResumeTemplateMinimalist from '../components/ResumeTemplateMinimalist';
import ResumeTemplateExecutive from '../components/ResumeTemplateExecutive';
import AIAssistant from '../components/AIAssistant';
import ResumePreview from '../components/ResumePreview';

const CreateResume = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    template: 'modern',
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      website: '',
      linkedin: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });
  const [currentSection, setCurrentSection] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const template = params.get('template');
    if (template && ['modern', 'classic', 'sidebar', 'creative', 'minimalist', 'executive'].includes(template)) {
      setFormData(prev => ({ ...prev, template }));
    }
  }, [location.search]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.personalInfo.name.trim()) {
      newErrors['personalInfo.name'] = 'Name is required';
    }
    
    if (!formData.personalInfo.email.trim()) {
      newErrors['personalInfo.email'] = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
      newErrors['personalInfo.email'] = 'Invalid email format';
    }
    
    if (!formData.personalInfo.phone.trim()) {
      newErrors['personalInfo.phone'] = 'Phone is required';
    }
    
    if (!formData.personalInfo.location.trim()) {
      newErrors['personalInfo.location'] = 'Location is required';
    }
    
    if (!formData.personalInfo.summary.trim()) {
      newErrors['personalInfo.summary'] = 'Professional summary is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      })
    }));
  };

  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/resumes',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Resume created successfully');
      navigate(`/edit/${response.data._id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error(error.response?.data?.message || 'Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  const handleAIContentGenerated = (content) => {
    if (!currentSection) return;
    
    setFormData(prev => ({
      ...prev,
      [currentSection]: content
    }));
  };

  const renderSection = (title, section, template) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => addArrayItem(section, template)}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add {title.slice(0, -1)}
        </button>
      </div>

      <AnimatePresence>
        {formData[section].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg relative"
          >
            <button
              type="button"
              onClick={() => removeArrayItem(section, index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>

            {Object.keys(template).map(field => (
              <div key={field} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === 'description' ? (
                  <textarea
                    value={item[field] || ''}
                    onChange={(e) => handleArrayChange(section, index, field, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                ) : (
                  <input
                    type="text"
                    value={item[field] || ''}
                    onChange={(e) => handleArrayChange(section, index, field, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // Add a function to render the selected template
  const renderSelectedTemplate = () => {
    if (formData.template === 'modern') {
      return <ResumeTemplateModern resume={formData} />;
    }
    if (formData.template === 'classic') {
      return <ResumeTemplateClassic resume={formData} />;
    }
    if (formData.template === 'sidebar') {
      return <ResumeTemplateSidebar resume={formData} />;
    }
    if (formData.template === 'creative') {
      return <ResumeTemplateCreative resume={formData} />;
    }
    if (formData.template === 'minimalist') {
      return <ResumeTemplateMinimalist resume={formData} />;
    }
    if (formData.template === 'executive') {
      return <ResumeTemplateExecutive resume={formData} />;
    }
    // Add more templates here as you create them
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Resume</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center text-blue-600 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-lg"
            >
              <EyeIcon className="h-5 w-5 mr-1" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!showPreview) {
                  setShowPreview(true);
                  setTimeout(() => window.print(), 100); // Wait for preview to render
                } else {
                  window.print();
                }
              }}
              className="flex items-center text-blue-600 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-lg"
            >
              <PrinterIcon className="h-5 w-5 mr-1" />
              Print
            </button>
          </div>
        </div>

        {showPreview ? (
          <div className="my-8">
            {renderSelectedTemplate()}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Resume Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Software Engineer Resume"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.title ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            {/* Template Selection */}
            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
                Choose Template
              </label>
              <select
                id="template"
                name="template"
                value={formData.template}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="sidebar">Sidebar</option>
                <option value="creative">Creative</option>
                <option value="minimalist">Minimalist</option>
                <option value="executive">Executive</option>
                {/* Add more options as you create more templates */}
              </select>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="personalInfo.name"
                    value={formData.personalInfo.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors['personalInfo.name'] ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors['personalInfo.name'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['personalInfo.name']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="personalInfo.email"
                    value={formData.personalInfo.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors['personalInfo.email'] ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors['personalInfo.email'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['personalInfo.email']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="personalInfo.phone"
                    value={formData.personalInfo.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors['personalInfo.phone'] ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors['personalInfo.phone'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['personalInfo.phone']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="personalInfo.location"
                    value={formData.personalInfo.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors['personalInfo.location'] ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors['personalInfo.location'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['personalInfo.location']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="personalInfo.website"
                    value={formData.personalInfo.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="personalInfo.linkedin"
                    value={formData.personalInfo.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Summary *
                </label>
                <textarea
                  id="summary"
                  name="personalInfo.summary"
                  value={formData.personalInfo.summary}
                  onChange={handleChange}
                  placeholder="Write a brief summary of your professional background and career goals..."
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors['personalInfo.summary'] ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors['personalInfo.summary'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.summary']}</p>
                )}
              </div>
            </div>

            {/* Experience Section */}
            {renderSection('Experience', 'experience', {
              role: '',
              company: '',
              start: '',
              end: '',
              description: ''
            })}

            {/* Education Section */}
            {renderSection('Education', 'education', {
              degree: '',
              school: '',
              start: '',
              end: '',
              description: ''
            })}

            {/* Skills Section */}
            {renderSection('Skills', 'skills', {
              name: ''
            })}

            {/* Projects Section */}
            {renderSection('Projects', 'projects', {
              title: '',
              description: ''
            })}

            {/* AI Assistant */}
            <div className="mt-8">
              <AIAssistant
                onContentGenerated={handleAIContentGenerated}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Creating...' : 'Create Resume'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default CreateResume; 