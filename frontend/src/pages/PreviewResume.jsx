import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import PDFExport from '../components/PDFExport';

const PreviewResume = () => {
  const { id } = useParams();
  const resumeRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Resume Preview</h1>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PrinterIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Print
              </button>
              <PDFExport 
                targetRef={resumeRef} 
                filename="resume.pdf"
              />
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <DocumentDuplicateIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Duplicate
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <ShareIcon className="-ml-1 mr-2 h-5 w-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={resumeRef} className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          {/* Resume Content */}
          <div className="p-8 print:p-0">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
              <p className="text-xl text-gray-600">Senior Software Engineer</p>
              <div className="mt-2 text-gray-500">
                <p>john.doe@example.com • (555) 123-4567</p>
                <p>San Francisco, CA • linkedin.com/in/johndoe</p>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                Professional Summary
              </h2>
              <p className="text-gray-600">
                Experienced software engineer with a strong background in full-stack development,
                specializing in React, Node.js, and cloud technologies. Passionate about creating
                scalable and maintainable applications.
              </p>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                Work Experience
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Senior Software Engineer</h3>
                      <p className="text-gray-600">Tech Company Inc.</p>
                    </div>
                    <p className="text-gray-500">Jan 2020 - Present</p>
                  </div>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    <li>Led development of microservices architecture serving 1M+ users</li>
                    <li>Implemented CI/CD pipelines reducing deployment time by 50%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Software Engineer</h3>
                      <p className="text-gray-600">Startup Co.</p>
                    </div>
                    <p className="text-gray-500">Jun 2018 - Dec 2019</p>
                  </div>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    <li>Developed and maintained React-based web applications</li>
                    <li>Optimized database queries improving performance by 30%</li>
                    <li>Collaborated with design team on UI/UX improvements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Bachelor of Science in Computer Science</h3>
                    <p className="text-gray-600">University of Technology</p>
                  </div>
                  <p className="text-gray-500">2014 - 2018</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'GraphQL', 'CI/CD'].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewResume; 