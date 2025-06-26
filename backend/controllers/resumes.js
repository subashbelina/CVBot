const Resume = require('../models/Resume');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Get all resumes (no user filter required)
// @route   GET /api/resumes
// @access  Public
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({});
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single resume (no user restriction)
// @route   GET /api/resumes/:id
// @access  Public
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new resume (no user required)
// @route   POST /api/resumes
// @access  Public
exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update resume (no user restriction)
// @route   PUT /api/resumes/:id
// @access  Public
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete resume (no user restriction)
// @route   DELETE /api/resumes/:id
// @access  Public
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Generate PDF (no user restriction)
// @route   GET /api/resumes/:id/pdf
// @access  Public
exports.generatePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Create PDF
    const doc = new PDFDocument();
    const filename = `resume-${resume._id}.pdf`;
    const filepath = path.join(__dirname, `../public/${filename}`);

    // Pipe PDF to file
    doc.pipe(fs.createWriteStream(filepath));

    // Add content to PDF based on template
    // This is a basic example - you'll want to customize this based on your templates
    if (resume.personalInfo && resume.personalInfo.name) {
      doc.fontSize(25).text(resume.personalInfo.name, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(resume.personalInfo.email || '');
      doc.text(resume.personalInfo.phone || '');
      doc.text(resume.personalInfo.location || '');
      doc.moveDown();

      // Add sections
      if (resume.personalInfo.summary) {
        doc.fontSize(16).text('Professional Summary');
        doc.fontSize(12).text(resume.personalInfo.summary);
        doc.moveDown();
      }
    }

    // Add experience
    if (resume.experience && resume.experience.length > 0) {
      doc.fontSize(16).text('Experience');
      resume.experience.forEach(exp => {
        doc.fontSize(14).text(exp.role || exp.position || '');
        doc.fontSize(12).text(exp.company || '');
        doc.text(`${exp.start || exp.startDate || ''} - ${exp.end || exp.endDate || 'Present'}`);
        doc.text(exp.description || '');
        doc.moveDown();
      });
    }

    // Add education
    if (resume.education && resume.education.length > 0) {
      doc.fontSize(16).text('Education');
      resume.education.forEach(edu => {
        doc.fontSize(14).text(edu.degree || '');
        doc.fontSize(12).text(edu.school || '');
        doc.text(`${edu.start || ''} - ${edu.end || ''}`);
        doc.text(edu.description || '');
        doc.moveDown();
      });
    }

    // Add skills
    if (resume.skills && resume.skills.length > 0) {
      doc.fontSize(16).text('Skills');
      const skillsText = resume.skills.map(skill => skill.name || skill).join(', ');
      doc.fontSize(12).text(skillsText);
      doc.moveDown();
    }

    // Finalize PDF
    doc.end();

    // Send file
    res.download(filepath, filename, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Failed to download PDF'
        });
      }
      // Clean up file after download
      fs.unlink(filepath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting PDF file:', unlinkErr);
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 