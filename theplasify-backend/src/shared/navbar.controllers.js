// File: controllers/navbarController.js
const Header = require('../shared/navbar.model');
const upload = require('../../uploads/multer');

// Get All Header Data
exports.getAllHeaders = async (req, res) => {
  try {
    const headers = await Header.find();
    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching headers', error });
  }
};

// Get Single Header by ID
exports.getHeaderById = async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.status(200).json(header);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching header', error });
  }
};

// Create a New Header
exports.createHeader = [
  upload.single('logo'), // Middleware to handle file upload
  async (req, res) => {
    try {
      const headerData = {
        ...req.body,
        logo: req.file ? `/uploads/${req.file.filename}` : undefined, // Save logo path if uploaded
      };

      const header = new Header(headerData);
      await header.save();
      res.status(201).json({ message: 'Header created successfully', header });
    } catch (error) {
      res.status(500).json({ message: 'Error creating header', error });
    }
  },
];


// Update an Existing Header by ID
exports.updateHeader = async (req, res) => {
  try {
    const header = await Header.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.status(200).json({ message: 'Header updated successfully', header });
  } catch (error) {
    res.status(500).json({ message: 'Error updating header', error });
  }
};

// Delete a Header by ID
exports.deleteHeader = async (req, res) => {
  try {
    const header = await Header.findByIdAndDelete(req.params.id);
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.status(200).json({ message: 'Header deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting header', error });
  }
};
