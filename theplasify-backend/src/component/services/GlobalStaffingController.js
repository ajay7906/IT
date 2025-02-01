// File: controllers/GlobalStaffingController.js

const GlobalStaffing = require('./GlobalStaffingModel');

// Get all global staffing data
exports.getAllGlobalStaffing = async (req, res) => {
  try {
    const data = await GlobalStaffing.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching global staffing data', error });
  }
};

// Get a single global staffing record by ID
exports.getGlobalStaffingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await GlobalStaffing.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Global staffing record not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching global staffing record', error });
  }
};

// Create new global staffing data
exports.createGlobalStaffing = async (req, res) => {
  try {
    const { header, sections, aiDrivenProcesses, serviceOfferings, recruitmentPositions } = req.body;

    // Check for uploaded files
    const headerImage = req.files?.headerImage?.[0]?.path;
    if (!headerImage) {
      return res.status(400).json({ message: 'Header image is required' });
    }

    // Add header image
    header.image = headerImage;

    // Create new global staffing record
    const staffing = new GlobalStaffing({
      header,
      sections: JSON.parse(sections),
      aiDrivenProcesses: JSON.parse(aiDrivenProcesses),
      serviceOfferings: JSON.parse(serviceOfferings),
      recruitmentPositions: JSON.parse(recruitmentPositions),
    });

    await staffing.save();
    res.status(201).json({ message: 'Global staffing data created successfully', staffing });
  } catch (error) {
    res.status(500).json({ message: 'Error creating global staffing data', error: error.message });
  }
};

// Update global staffing data
exports.updateGlobalStaffing = async (req, res) => {
  try {
    const { id } = req.params;
    const { header, sections, aiDrivenProcesses, serviceOfferings, recruitmentPositions } = req.body;

    const updatedData = {};

    if (header) updatedData.header = { ...JSON.parse(header) };
    if (sections) updatedData.sections = JSON.parse(sections);
    if (aiDrivenProcesses) updatedData.aiDrivenProcesses = JSON.parse(aiDrivenProcesses);
    if (serviceOfferings) updatedData.serviceOfferings = JSON.parse(serviceOfferings);
    if (recruitmentPositions) updatedData.recruitmentPositions = JSON.parse(recruitmentPositions);

    if (req.files && req.files.headerImage) {
      updatedData.header.image = req.files.headerImage[0].path;
    }

    const data = await GlobalStaffing.findByIdAndUpdate(id, updatedData, { new: true });
    if (!data) {
      return res.status(404).json({ message: 'Global staffing record not found' });
    }

    res.status(200).json({ message: 'Global staffing data updated successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Error updating global staffing data', error });
  }
};

// Delete global staffing data
exports.deleteGlobalStaffing = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await GlobalStaffing.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Global staffing record not found' });
    }
    res.status(200).json({ message: 'Global staffing data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting global staffing data', error });
  }
};
