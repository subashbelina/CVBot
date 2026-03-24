import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const YourResumesSection = ({ variants, resumes, onDelete }) => {
  return (
    <motion.div variants={variants}>
      <Card className="dashboard-glass-card shadow-2xl text-white">
        <CardHeader>
          <CardTitle className="text-white">Your Resumes</CardTitle>
          <CardDescription className="text-gray-100/80">
            View and manage your resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resumes.length === 0 ? (
            <div className="text-gray-100/70">No resumes found. Create your first resume!</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">{resume.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Template: {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}
                    </p>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/edit/${resume._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(resume._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default YourResumesSection;
