const Footer = require('./footer.model');

// Get All Footer Data
exports.getAllFooters = async (req, res) => {
  try {
    const footers = await Footer.find();
    res.status(200).json(footers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching footers', error });
  }
};

// Get Footer by ID
exports.getFooterById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching footer', error });
  }
};

// Create a New Footer
exports.createFooter = async (req, res) => {
  try {
    const footer = new Footer(req.body);
    await footer.save();
    res.status(201).json({ message: 'Footer created successfully', footer });
  } catch (error) {
    res.status(500).json({ message: 'Error creating footer', error });
  }
};

// Update Footer by ID
exports.updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }
    res.status(200).json({ message: 'Footer updated successfully', footer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating footer', error });
  }
};

// Delete Footer by ID
exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }
    res.status(200).json({ message: 'Footer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting footer', error });
  }
};
