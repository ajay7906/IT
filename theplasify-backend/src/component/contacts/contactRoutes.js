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
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('./contactController');

// CRUD Routes
router.get('/getAll', getAllContacts); // Get all contact data
router.get('/getById/:id', getContactById); // Get a single contact section by ID
router.post(
    '/add',
    upload.fields([
      { name: 'headerImage', maxCount: 1 }, // Header image
      { name: 'addressesImages', maxCount: 10 }, // Images for addresses (if any)
    ]),
    createContact
  );
   // Create a new contact section
router.put('/update/:id', upload.single('headerImage'), updateContact); // Update a contact section
router.delete('/delete/:id', deleteContact); // Delete a contact section

module.exports = router;
