const express = require('express');
const {
  getAllHeaders,
  getHeaderById,
  createHeader,
  updateHeader,
  deleteHeader,
} = require('./navbar.controllers');

const router = express.Router();

// Routes
router.get('/getAll', getAllHeaders); // Get all headers
router.get('/:id', getHeaderById); // Get a single header by ID
router.post('/add', createHeader); // Create a new header
router.put('/update/:id', updateHeader); // Update a header by ID
router.delete('/delete/:id', deleteHeader); // Delete a header by ID

module.exports = router;
