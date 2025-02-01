const TechnologyTraining = require('./technologyTrainingModel');

// Get all technology trainings
exports.getAllTechnologyTrainings = async (req, res) => {
  try {
    const data = await TechnologyTraining.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching technology training data', error });
  }
};

// Get a single technology training by ID
exports.getTechnologyTrainingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TechnologyTraining.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Technology training not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching technology training', error });
  }
};

// Create a new technology training
exports.createTechnologyTraining = async (req, res) => {
  try {
    const { header, content } = req.body;

    // Check for uploaded files
    const headerImage = req.files?.headerImage?.[0]?.path;
    const contentImage = req.files?.contentImage?.[0]?.path;
    if (!headerImage || !contentImage) {
      return res.status(400).json({ message: 'Required images are missing' });
    }

    // Validate required fields
    if (!header?.title || !header?.subtitle) {
      return res.status(400).json({ message: 'Header title and subtitle are required' });
    }

    if (!content?.title || !content?.description) {
      return res.status(400).json({ message: 'Content title and description are required' });
    }

    // Create new technology training
    const training = new TechnologyTraining({
      header: { ...header, image: headerImage },
      content: { ...content, image: contentImage },
    });

    await training.save();
    res.status(201).json({ message: 'Technology training created successfully', training });
  } catch (error) {
    res.status(500).json({ message: 'Error creating technology training', error: error.message });
  }
};

// Update a technology training
exports.updateTechnologyTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { header, content } = req.body;

    const updatedData = {};

    if (header) updatedData.header = { ...JSON.parse(header) };
    if (content) updatedData.content = { ...JSON.parse(content) };

    if (req.files && req.files.headerImage) {
      updatedData.header.image = req.files.headerImage[0].path;
    }
    if (req.files && req.files.contentImage) {
      updatedData.content.image = req.files.contentImage[0].path;
    }

    const data = await TechnologyTraining.findByIdAndUpdate(id, updatedData, { new: true });
    if (!data) {
      return res.status(404).json({ message: 'Technology training not found' });
    }

    res.status(200).json({ message: 'Technology training updated successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Error updating technology training', error });
  }
};

// Delete a technology training
exports.deleteTechnologyTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TechnologyTraining.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Technology training not found' });
    }
    res.status(200).json({ message: 'Technology training deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting technology training', error });
  }
};
