const Banner = require('./bannerModel');

// Get all Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error });
  }
};

// Get a single Banner by ID
exports.getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banner', error });
  }
};

// Create a new Banner
exports.createBanner = async (req, res) => {
    try {
      const { title, subTitle, description } = req.body;
  
      if (Array.isArray(description)) {
        return res.status(400).json({ message: 'Description must be a string, not an array' });
      }
  
      const backgroundImage = req.file ? req.file.path : null;
      if (!backgroundImage) {
        return res.status(400).json({ message: 'Background image is required' });
      }
  
      const banner = new Banner({ backgroundImage, title, subTitle, description });
      await banner.save();
      res.status(201).json({ message: 'Banner created successfully', banner });
    } catch (error) {
      res.status(500).json({ message: 'Error creating banner', error });
    }
  };
  

// Update a Banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subTitle, description } = req.body;

    const updatedData = { title, subTitle, description };
    if (req.file) {
      updatedData.backgroundImage = req.file.path; // Update image if provided
    }

    const banner = await Banner.findByIdAndUpdate(id, updatedData, { new: true });
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.status(200).json({ message: 'Banner updated successfully', banner });
  } catch (error) {
    res.status(500).json({ message: 'Error updating banner', error });
  }
};

// Delete a Banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting banner', error });
  }
};
