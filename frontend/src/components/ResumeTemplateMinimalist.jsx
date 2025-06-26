import React from 'react';

const ResumeTemplateMinimalist = ({ resume }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:mx-0">
      {/* Minimalist Header */}
      <header className="p-12 border-b-2 border-gray-200">
        <h1 className="text-5xl font-light text-gray-900 mb-2">{resume.personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 mb-6">{resume.personalInfo.title || 'Professional'}</p>
        <div className="flex flex-wrap gap-6 text-gray-500">
          <p>{resume.personalInfo.email}</p>
          <p>{resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      <main className="p-12">
        {/* Professional Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Summary</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{resume.personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Experience</h2>
          <div className="space-y-8">
            {resume.experience.map((exp, index) => (
              <div key={index} className="border-l border-gray-300 pl-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-600 mb-3">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Education</h2>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="border-l border-gray-300 pl-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-gray-500">{edu.graduationYear}</span>
                </div>
                <p className="text-gray-600 mb-2">{edu.institution}</p>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        {Array.isArray(resume.projects) && resume.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-8">Projects</h2>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="border-l border-gray-300 pl-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-2">{project.technologies}</p>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ResumeTemplateMinimalist; 