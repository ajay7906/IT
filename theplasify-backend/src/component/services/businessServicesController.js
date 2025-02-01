const BusinessServices = require('./businessServicesModel');

// Get all business services
exports.getAllBusinessServices = async (req, res) => {
    try {
        const data = await BusinessServices.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching business services data', error });
    }
};

// Get a single business service by ID
exports.getBusinessServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await BusinessServices.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Business service not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching business service', error });
    }
};

// Create a new business service
exports.createBusinessService = async (req, res) => {
    try {
      // Log request data for debugging
      console.log('Request Body:', req.body);
      console.log('Uploaded Files:', req.files);
  
      const { header, content, features } = req.body;
  
      // Check for uploaded files
      const headerImage = req.files?.headerImage?.[0]?.path;
      const contentImage = req.files?.contentImage?.[0]?.path;
  
      if (!headerImage || !contentImage) {
        return res.status(400).json({ message: 'Header and Content images are required' });
      }
  
      // Validate and parse JSON fields
      let parsedFeatures;
      try {
        parsedFeatures = JSON.parse(features); // Parse features as JSON
      } catch (err) {
        return res.status(400).json({ message: 'Invalid JSON format in features', error: err.message });
      }
  
      // Validate individual header and content fields
      if (!header.title || !header.subtitle) {
        return res.status(400).json({ message: 'Header title and subtitle are required' });
      }
  
      if (!content.title || !content.description) {
        return res.status(400).json({ message: 'Content title and description are required' });
      }
  
      // Create the business service
      const businessService = new BusinessServices({
        header: {
          title: header.title,
          subtitle: header.subtitle,
          image: headerImage,
        },
        content: {
          title: content.title,
          description: content.description,
          image: contentImage,
        },
        features: parsedFeatures,
      });
  
      await businessService.save();
      res.status(201).json({ message: 'Business service created successfully', businessService });
    } catch (error) {
      console.error('Error creating business service:', error);
      res.status(500).json({ message: 'Error creating business service', error: error.message });
    }
  };
  



// Update a business service
exports.updateBusinessService = async (req, res) => {
    try {
      const { id } = req.params;
      const { header, content, features } = req.body;
  
      // Initialize the object to store the fields to be updated
      const updatedData = {};
  
      // Parse and validate `header` field
      if (header) {
        try {
          updatedData.header = JSON.parse(header);
  
          // Validate parsed header fields
          if (!updatedData.header.title || !updatedData.header.subtitle) {
            return res.status(400).json({ message: 'Header title and subtitle are required' });
          }
        } catch (err) {
          return res.status(400).json({ message: 'Invalid JSON format in header', error: err.message });
        }
      }
  
      // Parse and validate `content` field
      if (content) {
        try {
          updatedData.content = JSON.parse(content);
  
          // Validate parsed content fields
          if (!updatedData.content.title || !updatedData.content.description) {
            return res.status(400).json({ message: 'Content title and description are required' });
          }
        } catch (err) {
          return res.status(400).json({ message: 'Invalid JSON format in content', error: err.message });
        }
      }
  
      // Parse and validate `features` field
      if (features) {
        try {
          updatedData.features = JSON.parse(features);
  
          // Ensure features is an array and not empty
          if (!Array.isArray(updatedData.features) || updatedData.features.length === 0) {
            return res.status(400).json({ message: 'Features must be a valid array and cannot be empty' });
          }
        } catch (err) {
          return res.status(400).json({ message: 'Invalid JSON format in features', error: err.message });
        }
      }
  
      // Update images if provided in the request
      if (req.files && req.files.headerImage) {
        updatedData.header = updatedData.header || {}; // Ensure `header` exists
        updatedData.header.image = req.files.headerImage[0].path;
      }
      if (req.files && req.files.contentImage) {
        updatedData.content = updatedData.content || {}; // Ensure `content` exists
        updatedData.content.image = req.files.contentImage[0].path;
      }
  
      // Update the document in the database
      const data = await BusinessServices.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!data) {
        return res.status(404).json({ message: 'Business service not found' });
      }
  
      res.status(200).json({ message: 'Business service updated successfully', data });
    } catch (error) {
      console.error('Error updating business service:', error); // Debugging
      res.status(500).json({ message: 'Error updating business service', error: error.message });
    }
  };
  

// Delete a business service
exports.deleteBusinessService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await BusinessServices.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: 'Business service not found' });
        }
        res.status(200).json({ message: 'Business service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting business service', error });
    }
};
