const Feature = require('../home/featuresSection.model');
const upload = require('../../../uploads/multer');

// Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching features', error });
  }
};

// Get a single feature by ID
exports.getFeatureById = async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await Feature.findById(id);
    if (!feature) return res.status(404).json({ message: 'Feature not found' });
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feature', error });
  }
};

// Create a new feature
exports.createFeature = async (req, res) => {
  try {
    const { title, description } = req.body;
    const bgImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!bgImage) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newFeature = new Feature({ title, description, bgImage });
    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (error) {
    res.status(400).json({ message: 'Error creating feature', error });
  }
};

// Update an existing feature
exports.updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const bgImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { title, description };
    if (bgImage) updatedData.bgImage = bgImage;

    const updatedFeature = await Feature.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedFeature) return res.status(404).json({ message: 'Feature not found' });
    res.status(200).json(updatedFeature);
  } catch (error) {
    res.status(400).json({ message: 'Error updating feature', error });
  }
};

// Delete a feature
exports.deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeature = await Feature.findByIdAndDelete(id);
    if (!deletedFeature) return res.status(404).json({ message: 'Feature not found' });
    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feature', error });
  }
};
