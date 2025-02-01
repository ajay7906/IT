const express = require('express');
const router = express.Router();
const featureController = require('../home/featuresSection.controller');
const upload = require('../../../uploads/multer');

// CRUD Routes
router.get('/getAllFeatures', featureController.getAllFeatures); // Get all features
router.get('/get:id', featureController.getFeatureById); // Get a feature by ID
router.post('/addFeatures', upload.single('bgImage'), featureController.createFeature); // Create a new feature
router.put('/update:id', upload.single('bgImage'), featureController.updateFeature); // Update a feature by ID
router.delete('/delete:id', featureController.deleteFeature); // Delete a feature by ID

module.exports = router;
