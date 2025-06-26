import React from 'react';

const ResumeTemplateCreative = ({ resume }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:mx-0">
      {/* Header with Creative Design */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
        <p className="text-xl opacity-90 mb-4">{resume.personalInfo.title || 'Professional'}</p>
        <div className="flex flex-wrap gap-4 text-sm">
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
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Experience */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Experience</h2>
              <div className="space-y-6">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{exp.title}</h3>
                      <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            {Array.isArray(resume.projects) && resume.projects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Projects</h2>
                <div className="space-y-4">
                  {resume.projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      <p className="text-blue-600 text-sm mb-2">{project.technologies}</p>
                      <p className="text-gray-700">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Skills */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Skills</h2>
              <div className="space-y-2">
                {resume.skills.map((skill, index) => (
                  <div key={index} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Education</h2>
              <div className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    <p className="text-gray-600 text-sm">{edu.graduationYear}</p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeTemplateCreative; 