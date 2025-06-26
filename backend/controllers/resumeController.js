const Resume = require('../models/Resume');

const resumeController = {
  // Create a new resume (no user required)
  async create(req, res) {
    try {
      const resume = new Resume({
        ...req.body,
        // Remove user requirement - allow anonymous resumes
        user: req.user?._id || null
      });

      await resume.save();
      res.status(201).json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create resume' });
    }
  },

  // Get all resumes (no user filter required)
  async getAll(req, res) {
    try {
      // If user is authenticated, show their resumes, otherwise show all
      const query = req.user?._id ? { user: req.user._id } : {};
      const resumes = await Resume.find(query);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resumes' });
    }
  },

  // Get a single resume (no user restriction)
  async getOne(req, res) {
    try {
      const resume = await Resume.findById(req.params.id);

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resume' });
    }
  },

  // Update a resume (no user restriction)
  async update(req, res) {
    try {
      const resume = await Resume.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update resume' });
    }
  },

  // Delete a resume (no user restriction)
  async delete(req, res) {
    try {
      const resume = await Resume.findByIdAndDelete(req.params.id);

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete resume' });
    }
  }
};

module.exports = resumeController; 