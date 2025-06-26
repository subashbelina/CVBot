import React from 'react';

const ResumeTemplate = ({ resume }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:mx-0">
      {/* Header Section */}
      <header className="p-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resume.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {resume.personalInfo.email}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {resume.personalInfo.phone}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {resume.personalInfo.location}
          </p>
        </div>
      </header>

      <main className="p-8">
        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Professional Summary</h2>
          <p className="text-gray-600 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Experience</h2>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <p className="font-medium text-gray-800">{exp.company}</p>
                  <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Education</h2>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <p className="font-medium text-gray-800">{edu.institution}</p>
                  <p className="text-gray-600">{edu.graduationYear}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  {edu.description && (
                    <p className="text-gray-600 mt-2">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resume.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Projects</h2>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-gray-600">{project.technologies}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ResumeTemplate; 