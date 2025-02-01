const ApplicationService = require('./applicationServicesModel');

// Get all application services data
exports.getApplicationServices = async (req, res) => {
  try {
    const data = await ApplicationService.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application services data', error });
  }
};

// Get a single application service by ID
exports.getApplicationServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ApplicationService.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Application service not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application service', error });
  }
};

// Create a new application service
exports.createApplicationService = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);

    const { header, content, tabs } = req.body;

    // Parse JSON fields
    let parsedHeader, parsedContent, parsedTabs;
    try {
      parsedHeader = JSON.parse(header);
      parsedContent = JSON.parse(content);
      parsedTabs = JSON.parse(tabs);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON format in request body', error: err.message });
    }

    // Check for uploaded files
    const headerImage = req.files?.headerImage?.[0]?.path;
    const secondaryImage = req.files?.secondaryImage?.[0]?.path;

    if (!headerImage || !secondaryImage) {
      return res.status(400).json({ message: 'Required images are missing' });
    }

    // Attach tab images
    if (!Array.isArray(parsedTabs)) {
      return res.status(400).json({ message: 'Tabs must be a valid array' });
    }
    const tabImages = req.files?.tabImages || [];
    parsedTabs.forEach((tab, index) => {
      if (tabImages[index]) {
        tab.image = tabImages[index].path;
      } else {
        throw new Error(`Image missing for tab ${index + 1}`);
      }
    });

    // Create and save new application service
    const applicationService = new ApplicationService({
      header: { ...parsedHeader, image: headerImage },
      content: { ...parsedContent, secondaryImage },
      tabs: parsedTabs,
    });

    await applicationService.save();
    res.status(201).json({ message: 'Application service created successfully', applicationService });
  } catch (error) {
    console.error('Error creating application service:', error);
    res.status(500).json({ message: 'Error creating application service', error: error.message });
  }
};

// Update an application service
exports.updateApplicationService = async (req, res) => {
  try {
    const { id } = req.params;
    const { header, content, tabs } = req.body;

    const updatedData = {};
    if (header) updatedData.header = JSON.parse(header);
    if (content) updatedData.content = JSON.parse(content);
    if (tabs) updatedData.tabs = JSON.parse(tabs);

    if (req.files?.headerImage) {
      updatedData.header.image = req.files.headerImage[0].path;
    }
    if (req.files?.secondaryImage) {
      updatedData.content.secondaryImage = req.files.secondaryImage[0].path;
    }

    const tabImages = req.files?.tabImages || [];
    if (updatedData.tabs) {
      updatedData.tabs.forEach((tab, index) => {
        if (tabImages[index]) {
          tab.image = tabImages[index].path;
        }
      });
    }

    const data = await ApplicationService.findByIdAndUpdate(id, updatedData, { new: true });
    if (!data) {
      return res.status(404).json({ message: 'Application service not found' });
    }

    res.status(200).json({ message: 'Application service updated successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application service', error: error.message });
  }
};

// Delete an application service
exports.deleteApplicationService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ApplicationService.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Application service not found' });
    }
    res.status(200).json({ message: 'Application service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application service', error });
  }
};
