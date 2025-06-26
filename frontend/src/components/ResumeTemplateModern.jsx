import React from 'react';

export default function ResumeTemplateModern({ resume }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-primary-100">
      <h2 className="text-3xl font-bold text-primary-700 mb-2">{resume.title || 'Resume Title'}</h2>
      <div className="mb-2 flex flex-wrap gap-4 text-gray-700">
        <span className="font-semibold">{resume.personalInfo.name || 'Your Name'}</span>
        <span>| {resume.personalInfo.email || 'email@example.com'}</span>
        <span>| {resume.personalInfo.phone || 'Phone'}</span>
      </div>
      <div className="mb-2 text-gray-700">{resume.personalInfo.location || 'Location'}</div>
      <div className="mb-4 italic text-gray-600">{resume.personalInfo.summary || 'Professional summary goes here.'}</div>
      <div className="mb-4">
        <h3 className="font-semibold text-primary-600">Experience</h3>
        <ul className="list-disc ml-5">
          {resume.experience.map((exp, i) => (
            <li key={i} className="mb-1">
              <span className="font-semibold">{exp.role || 'Role'}</span> at <span className="font-semibold">{exp.company || 'Company'}</span> ({exp.start || 'Start'} - {exp.end || 'End'})<br />
              <span className="text-gray-600">{exp.description || 'Description...'}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-primary-600">Education</h3>
        <ul className="list-disc ml-5">
          {resume.education.map((edu, i) => (
            <li key={i} className="mb-1">
              <span className="font-semibold">{edu.degree || 'Degree'}</span> at <span className="font-semibold">{edu.school || 'School'}</span> ({edu.start || 'Start'} - {edu.end || 'End'})<br />
              <span className="text-gray-600">{edu.description || 'Description...'}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-primary-600">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, i) => (
            <span key={i} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">{skill.name || skill}</span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-primary-600">Projects</h3>
        <ul className="list-disc ml-5">
          {Array.isArray(resume.projects) && resume.projects.length > 0 ? (
            resume.projects.map((proj, i) => (
              <li key={i} className="mb-1">
                <span className="font-semibold">{proj.title || 'Project Title'}</span>: <span className="text-gray-600">{proj.description || 'Description...'}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic">No projects added yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
} 