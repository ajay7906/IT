const Tab = require('../home/tabSection.model');

// Get all tabs
exports.getAllTabs = async (req, res) => {
  try {
    const tabs = await Tab.find();
    res.status(200).json(tabs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tabs', error });
  }
};

// Get a single tab by ID
exports.getTabById = async (req, res) => {
  try {
    const { id } = req.params;
    const tab = await Tab.findById(id);
    if (!tab) return res.status(404).json({ message: 'Tab not found' });
    res.status(200).json(tab);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tab', error });
  }
};

// Create a new tab
exports.createTab = async (req, res) => {
    try {
      const { title, heading, description } = req.body;
  
      // Check if required fields are provided
      if (!title || !heading || !description) {
        return res.status(400).json({ message: 'All fields (title, heading, description) are required.' });
      }
  
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required.' });
      }
  
      // Create image path
      const image = `/uploads/${req.file.filename}`;
  
      // Create a new Tab
      const newTab = new Tab({ title, heading, description, image });
      await newTab.save();
  
      res.status(201).json(newTab);
    } catch (error) {
      res.status(500).json({ message: 'Error creating tab', error });
    }
  };
  
// Update an existing tab
exports.updateTab = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTab = await Tab.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTab) return res.status(404).json({ message: 'Tab not found' });
    res.status(200).json(updatedTab);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tab', error });
  }
};

// Delete a tab
exports.deleteTab = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTab = await Tab.findByIdAndDelete(id);
    if (!deletedTab) return res.status(404).json({ message: 'Tab not found' });
    res.status(200).json({ message: 'Tab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tab', error });
  }
};
