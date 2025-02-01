const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

// Multer middleware for multiple fields
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'bannerBackgroundImage', maxCount: 1 },
]);

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./productController');
const {
  getTabs,
  getTabById,
  createTab,
  updateTab,
  deleteTab,
} = require('./tabController');
// CRUD Routes
router.get('/getAll', getProducts); // Get all products
router.get('/getByID/:id', getProductById); // Get a single product by ID
router.post('/add', upload, createProduct); // Create a new product
router.put('/update/:id', upload, updateProduct); // Update a product
router.delete('/delete/:id', deleteProduct); // Delete a product

// CRUD Routes
router.get('/tabGetAll', getTabs); // Get all tabs
router.get('/tabGetById/:id', getTabById); // Get a single tab by ID
router.post('/tabAdd', createTab); // Create a new tab
router.put('/tabUpdate/:id', updateTab); // Update a tab
router.delete('/tabDelete/:id', deleteTab); // Delete a tab

module.exports = router;
