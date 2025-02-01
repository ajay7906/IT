const express = require('express');
const router = express.Router();
const upload = require('../../middleware/imageUpload');
const {
  getAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
} = require('./aboutUsController');

// CRUD Routes
router.get('/getAll', getAboutUs); // Fetch all entries
router.get('/getById/:id', getAboutUsById); // Fetch a single entry by ID
router.post('/add', upload.single('icon'), createAboutUs); // Create a new entry
router.put('/update/:id', upload.single('icon'), updateAboutUs); // Update an entry
router.delete('/delete/:id', deleteAboutUs); // Delete an entry

module.exports = router;
