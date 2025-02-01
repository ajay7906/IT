const BusinessSection = require('../home/businessSection.model');

// Get all business sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await BusinessSection.find();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business sections', error });
  }
};

// Get a single business section by ID
exports.getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await BusinessSection.findById(id);
    if (!section) return res.status(404).json({ message: 'Business section not found' });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business section', error });
  }
};

// Create a new business section
exports.createSection = async (req, res) => {
    try {
      const { title, description, skillsHeading, skillsLeft, skillsRight } = req.body;
  
      const newSection = new BusinessSection({ title, description, skillsHeading, skillsLeft, skillsRight });
      await newSection.save();
      res.status(201).json(newSection);
    } catch (error) {
      res.status(400).json({ message: 'Error creating business section', error });
    }
  };
  
//update
  exports.updateSection = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSection = await BusinessSection.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedSection) return res.status(404).json({ message: 'Business section not found' });
      res.status(200).json(updatedSection);
    } catch (error) {
      res.status(400).json({ message: 'Error updating business section', error });
    }
  };
  
// Delete a business section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSection = await BusinessSection.findByIdAndDelete(id);
    if (!deletedSection) return res.status(404).json({ message: 'Business section not found' });
    res.status(200).json({ message: 'Business section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting business section', error });
  }
};
