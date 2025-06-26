import React from 'react';

const ResumeTemplateClassic = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resume.personalInfo?.name || resume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-600 space-x-4">
          {resume.personalInfo?.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo?.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo?.location && (
            <span>{resume.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700">{resume.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {exp.start} - {exp.end}
                  </div>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {edu.start} - {edu.end}
                  </div>
                </div>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {resume.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-700">• {skill.name || skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {Array.isArray(resume.projects) && resume.projects.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ResumeTemplateClassic; 