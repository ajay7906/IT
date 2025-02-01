const AboutUs = require('./aboutUsModel');

// Get all About Us entries
exports.getAboutUs = async (req, res) => {
  try {
    const aboutUsEntries = await AboutUs.find();
    res.status(200).json(aboutUsEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching About Us entries', error });
  }
};

// Get a single About Us entry by ID
exports.getAboutUsById = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUsEntry = await AboutUs.findById(id);
    if (!aboutUsEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(aboutUsEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching About Us entry', error });
  }
};

// Create a new About Us entry
exports.createAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;
    const icon = req.file ? req.file.path : null;

    if (!icon) {
      return res.status(400).json({ message: 'Icon is required' });
    }

    const aboutUsEntry = new AboutUs({ icon, title, description });
    await aboutUsEntry.save();
    res.status(201).json({ message: 'About Us entry created successfully', aboutUsEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating About Us entry', error });
  }
};

// Update an About Us entry
exports.updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedData = { title, description };
    if (req.file) {
      updatedData.icon = req.file.path; // Update icon if new file is uploaded
    }

    const aboutUsEntry = await AboutUs.findByIdAndUpdate(id, updatedData, { new: true });

    if (!aboutUsEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'About Us entry updated successfully', aboutUsEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating About Us entry', error });
  }
};

// Delete an About Us entry
exports.deleteAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUsEntry = await AboutUs.findByIdAndDelete(id);
    if (!aboutUsEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'About Us entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting About Us entry', error });
  }
};
