const Slide = require('../home/heroSlider.model');
const upload = require('../../../uploads/multer');

// Get all slides
exports.getSlides = async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching slides', error: err });
  }
};
// Get a slide by ID
exports.getSlideById = async (req, res) => {
    try {
      const { id } = req.params;
      const slide = await Slide.findById(id);
      if (!slide) {
        return res.status(404).json({ message: 'Slide not found' });
      }
      res.status(200).json(slide);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching slide', error: err });
    }
  };
  
// add
  exports.addSlide = [
    upload.array('images', 10), // Allows up to 10 images for the `images` field
    async (req, res) => {
      try {
        const { title, description } = req.body;
  
        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: 'At least one image is required' });
        }
  
        // Get the paths of uploaded images
        const imagePaths = req.files.map((file) => file.path);
  
        const newSlide = new Slide({
          images: imagePaths, // Store array of image paths
          title,
          description,
        });
  
        await newSlide.save();
        res.status(201).json(newSlide);
      } catch (err) {
        res.status(400).json({ message: 'Error adding slide', error: err });
      }
    },
  ];
// Update an existing slide
exports.updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSlide = await Slide.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.status(200).json(updatedSlide);
  } catch (err) {
    res.status(400).json({ message: 'Error updating slide', error: err });
  }
};

// Delete a slide
exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlide = await Slide.findByIdAndDelete(id);
    if (!deletedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.status(200).json({ message: 'Slide deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting slide', error: err });
  }
};
