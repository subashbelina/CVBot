const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// All AI routes are now public (no authentication required)

// Generate content for a specific section
router.post('/generate', aiController.generateContent);

// Improve existing content
router.post('/improve', aiController.improveContent);

// Get career advice
router.post('/advice', aiController.getCareerAdvice);

module.exports = router; 