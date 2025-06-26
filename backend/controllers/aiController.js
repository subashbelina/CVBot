const aiService = require('../services/aiService');

const aiController = {
  async generateContent(req, res) {
    try {
      const { section, content } = req.body;
      
      if (!section || !content) {
        return res.status(400).json({ error: 'Section and content are required' });
      }

      const generatedContent = await aiService.generateResumeContent(section, content);
      res.json({ content: generatedContent });
    } catch (error) {
      console.error('Generate Content Error:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  },

  async improveContent(req, res) {
    try {
      const { content, section } = req.body;
      
      if (!content || !section) {
        return res.status(400).json({ error: 'Content and section are required' });
      }

      const improvedContent = await aiService.improveContent(content, section);
      res.json({ content: improvedContent });
    } catch (error) {
      console.error('Improve Content Error:', error);
      res.status(500).json({ error: 'Failed to improve content' });
    }
  },

  async getCareerAdvice(req, res) {
    try {
      const { question } = req.body;
      
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const advice = await aiService.getCareerAdvice(question);
      res.json({ advice });
    } catch (error) {
      console.error('Career Advice Error:', error);
      res.status(500).json({ error: 'Failed to get career advice' });
    }
  }
};

module.exports = aiController; 