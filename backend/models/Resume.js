const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  template: {
    type: String,
    enum: ['modern', 'classic', 'sidebar', 'creative', 'minimalist', 'executive'],
    default: 'modern'
  },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
    website: String,
    linkedin: String
  },
  experience: [{
    role: String,
    company: String,
    start: String,
    end: String,
    description: String
  }],
  education: [{
    degree: String,
    school: String,
    start: String,
    end: String,
    description: String
  }],
  skills: [{
    name: String
  }],
  projects: [{
    title: String,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume; 