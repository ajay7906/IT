const express = require('express');
const router = express.Router();
const tabController = require('../home/tabSection.controller');
const upload = require('../../../uploads/multer');

// CRUD Routes
router.get('/getAll', tabController.getAllTabs); // Get all tabs
router.get('/get:id', tabController.getTabById); // Get a tab by ID
router.post('/addTab', upload.single('image'), tabController.createTab); // Create a new tab with image upload
router.put('/update:id', upload.single('image'), tabController.updateTab); // Update a tab with image upload
router.delete('/delete:id', tabController.deleteTab); // Delete a tab

module.exports = router;
