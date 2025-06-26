import React from 'react';

const ResumeTemplateExecutive = ({ resume }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:mx-0">
      {/* Executive Header */}
      <header className="bg-gray-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
        <p className="text-xl text-gray-300 mb-6">{resume.personalInfo.title || 'Executive Professional'}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {resume.personalInfo.email}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {resume.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {resume.personalInfo.location}
          </div>
        </div>
      </header>

      <main className="p-10">
        {/* Executive Summary */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{resume.personalInfo.summary}</p>
        </section>

        {/* Core Competencies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resume.skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 px-4 py-3 rounded border-l-4 border-gray-900">
                <span className="font-semibold text-gray-900">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">Professional Experience</h2>
          <div className="space-y-8">
            {resume.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-900 pl-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-lg text-gray-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">Education & Certifications</h2>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-gray-900 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-lg text-gray-600 font-semibold">{edu.institution}</p>
                  </div>
                  <span className="text-gray-500 font-medium">{edu.graduationYear}</span>
                </div>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects & Achievements */}
        {Array.isArray(resume.projects) && resume.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">Key Projects & Achievements</h2>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-gray-900 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 font-semibold mb-2">{project.technologies}</p>
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

export default ResumeTemplateExecutive; 