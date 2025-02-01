const Career = require('./careerModel');

// Get all career data
exports.getCareerData = async (req, res) => {
  try {
    const careerData = await Career.find();
    res.status(200).json(careerData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching career data', error });
  }
};

// Get a specific career section by ID
exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);
    if (!career) {
      return res.status(404).json({ message: 'Career section not found' });
    }
    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching career section', error });
  }
};

// Create a new career section
exports.createCareer = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Logs text fields
    console.log('Uploaded Files:', req.files); // Logs uploaded files

    const { title, sections, jobs } = req.body;

    // Check for required fields
    if (!req.files || !req.files.headerImage) {
      return res.status(400).json({ message: 'Header image is required' });
    }

    const headerImage = req.files.headerImage[0].path;

    if (!title || !sections || !jobs) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Parse JSON strings
    const parsedSections = JSON.parse(sections).map((section, index) => ({
      ...section,
      image: req.files.sectionImages
        ? req.files.sectionImages[index]?.path || section.image
        : section.image,
    }));
    const parsedJobs = JSON.parse(jobs);

    // Create new career entry
    const career = new Career({
      title,
      headerImage,
      sections: parsedSections,
      jobs: parsedJobs,
    });

    await career.save();
    res.status(201).json({ message: 'Career section created successfully', career });
  } catch (error) {
    console.error('Error creating career section:', error);
    res.status(500).json({ message: 'Error creating career section', error });
  }
};




// Update a career section
exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, sections, jobs } = req.body;

    const updatedData = { title };
    if (sections) updatedData.sections = JSON.parse(sections); // Parse sections JSON
    if (jobs) updatedData.jobs = JSON.parse(jobs); // Parse jobs JSON
    if (req.file) updatedData.headerImage = req.file.path; // Update image if provided

    const career = await Career.findByIdAndUpdate(id, updatedData, { new: true });
    if (!career) {
      return res.status(404).json({ message: 'Career section not found' });
    }

    res.status(200).json({ message: 'Career section updated successfully', career });
  } catch (error) {
    res.status(500).json({ message: 'Error updating career section', error });
  }
};

// Delete a career section
exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByIdAndDelete(id);
    if (!career) {
      return res.status(404).json({ message: 'Career section not found' });
    }
    res.status(200).json({ message: 'Career section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting career section', error });
  }
};
