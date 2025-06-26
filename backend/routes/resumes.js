const express = require('express');
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  generatePDF
} = require('../controllers/resumes');

const router = express.Router();

router
  .route('/')
  .get(getResumes)
  .post(createResume);

router
  .route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

router.get('/:id/pdf', generatePDF);

module.exports = router; 