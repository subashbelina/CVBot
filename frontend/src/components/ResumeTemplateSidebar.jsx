import React from 'react';

const ResumeTemplateSidebar = ({ resume }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:mx-0">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/3 bg-gray-50 p-8 print:bg-white">
          {/* Profile Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{resume.personalInfo.fullName}</h1>
            <div className="space-y-3 text-gray-600">
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
          </div>

          {/* Skills Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Skills</h2>
            <div className="space-y-2">
              {resume.skills.map((skill, index) => (
                <div key={index} className="bg-white px-3 py-2 rounded-md text-gray-700 border border-gray-200">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Education</h2>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <main className="md:w-2/3 p-8">
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
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-600">{exp.description}</p>
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
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-gray-600 mb-2">{project.technologies}</p>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResumeTemplateSidebar; 