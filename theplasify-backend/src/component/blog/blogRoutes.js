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
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('./blogController');

// CRUD Routes
router.get('/getAll', getAllBlogs); // Get all blogs
router.get('/getById/:id', getBlogById); // Get a single blog by ID
router.post('/add', upload.single('image'), createBlog); // Create a new blog
router.put('/update/:id', upload.single('image'), updateBlog); // Update a blog
router.delete('/delete/:id', deleteBlog); // Delete a blog

module.exports = router;
