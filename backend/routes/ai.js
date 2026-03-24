const express = require('express');
const {
  generateSummary,
  enhanceJobDescription,
  suggestSkills,
  generateContent,
  improveContent,
  generateSuggestions
} = require('../services/aiContentService');

const router = express.Router();

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
// @access  Public
router.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const history = Array.isArray(chatHistory)
      ? chatHistory.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
      : [];

    const response = await generateContent('general', String(message).trim(), history);

    res.status(200).json({
      success: true,
      response
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get AI response'
    });
  }
});

// @desc    Generate content for a section
// @route   POST /api/ai/generate
// @access  Public
router.post('/generate', async (req, res) => {
  try {
    const { section, content, chatHistory } = req.body;
    const generatedContent = await generateContent(section, content, chatHistory);
    res.status(200).json({
      success: true,
      content: generatedContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Improve existing content
// @route   POST /api/ai/improve
// @access  Public
router.post('/improve', async (req, res) => {
  try {
    const { section, content, chatHistory } = req.body;
    const improvedContent = await improveContent(section, content, chatHistory);
    res.status(200).json({
      success: true,
      content: improvedContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Generate suggestions
// @route   POST /api/ai/suggestions
// @access  Public
router.post('/suggestions', async (req, res) => {
  try {
    const { section, content } = req.body;
    const suggestions = await generateSuggestions(section, content);
    res.status(200).json({
      success: true,
      suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Generate professional summary
// @route   POST /api/ai/summary
// @access  Public
router.post('/summary', async (req, res) => {
  try {
    const { experience, skills } = req.body;
    const summary = await generateSummary(experience, skills);
    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Enhance job description
// @route   POST /api/ai/enhance-description
// @access  Public
router.post('/enhance-description', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const enhancedDescription = await enhanceJobDescription(jobDescription);
    res.status(200).json({
      success: true,
      data: enhancedDescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Suggest skills
// @route   POST /api/ai/suggest-skills
// @access  Public
router.post('/suggest-skills', async (req, res) => {
  try {
    const { jobTitle, industry } = req.body;
    const skills = await suggestSkills(jobTitle, industry);
    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router; 