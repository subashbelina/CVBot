const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Resume routes (now public)
router.post('/resumes', resumeController.create);
router.get('/resumes', resumeController.getAll);
router.get('/resumes/:id', resumeController.getOne);
router.put('/resumes/:id', resumeController.update);
router.delete('/resumes/:id', resumeController.delete);

module.exports = router; 