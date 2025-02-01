const express = require('express');
const router = express.Router();
const businessSectionController = require('../home/businessSection.controller');

// CRUD Routes
router.get('/getAll', businessSectionController.getAllSections); // Get all business sections
router.get('/get:id', businessSectionController.getSectionById); // Get a business section by ID
router.post('/add', businessSectionController.createSection); // Create a new business section
router.put('/:id', businessSectionController.updateSection); // Update a business section by ID
router.delete('/:id', businessSectionController.deleteSection); // Delete a business section by ID

module.exports = router;
