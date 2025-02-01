const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for storing uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Add timestamp to avoid name conflicts
  },
});
const upload = multer({ storage });

const {
  getCareerData,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('./careerController');

// CRUD Routes
router.get('/getAll', getCareerData); // Get all career sections
router.get('/getById/:id', getCareerById); // Get a single career section by ID
router.post(
  '/add',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'sectionImages', maxCount: 10 }, // Optional for additional images
  ]),
  createCareer
);
 // Create a new career section
router.put(
  '/update/:id',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'sectionImages', maxCount: 10 },
  ])
,  
  updateCareer
); // Update a career section
router.delete('/delete/:id', deleteCareer); // Delete a career section

module.exports = router;
