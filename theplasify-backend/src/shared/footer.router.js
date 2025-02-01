const express = require('express');
const {
  getAllFooters,
  getFooterById,
  createFooter,
  updateFooter,
  deleteFooter,
} = require('./footer.controllers');

const router = express.Router();

// Routes
router.get('/getAll', getAllFooters); // Get all footers
router.get('/getById:id', getFooterById); // Get a footer by ID
router.post('/add', createFooter); // Create a new footer
router.put('/update/:id', updateFooter); // Update a footer by ID
router.delete('/delete/:id', deleteFooter); // Delete a footer by ID

module.exports = router;
