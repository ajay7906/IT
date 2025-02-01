const express = require('express');
const router = express.Router();
const upload = require('../../middleware/imageUpload');
const {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('./bannerController');

// CRUD Routes
router.get('/getAll', getBanners); // Get all banners
router.get('/getById/:id', getBannerById); // Get a single banner by ID
router.post('/add', upload.single('backgroundImage'), createBanner); // Create a new banner
router.put('/update/:id', upload.single('backgroundImage'), updateBanner); // Update a banner
router.delete('/delete/:id', deleteBanner); // Delete a banner

module.exports = router;
