const Tab = require('./tabModel');

// Get all tabs
exports.getTabs = async (req, res) => {
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
    if (!tab) {
      return res.status(404).json({ message: 'Tab not found' });
    }
    res.status(200).json(tab);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tab', error });
  }
};

// Create a new tab
exports.createTab = async (req, res) => {
  try {
    const { title, tabs } = req.body;

    if (!title || !tabs || !Array.isArray(tabs) || tabs.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const formattedTabs = tabs.map((tab) => ({
      title: tab.title,
      image: tab.image,
      description: tab.description,
    }));

    const tab = new Tab({ title, tabs: formattedTabs });
    await tab.save();
    res.status(201).json({ message: 'Tab created successfully', tab });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tab', error });
  }
};

// Update a tab
exports.updateTab = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tabs } = req.body;

    const updatedData = { title };
    if (tabs) {
      updatedData.tabs = tabs.map((tab) => ({
        title: tab.title,
        image: tab.image,
        description: tab.description,
      }));
    }

    const tab = await Tab.findByIdAndUpdate(id, updatedData, { new: true });
    if (!tab) {
      return res.status(404).json({ message: 'Tab not found' });
    }

    res.status(200).json({ message: 'Tab updated successfully', tab });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tab', error });
  }
};

// Delete a tab
exports.deleteTab = async (req, res) => {
  try {
    const { id } = req.params;
    const tab = await Tab.findByIdAndDelete(id);
    if (!tab) {
      return res.status(404).json({ message: 'Tab not found' });
    }
    res.status(200).json({ message: 'Tab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tab', error });
  }
};
