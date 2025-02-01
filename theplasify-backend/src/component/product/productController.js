const Product = require('./productModel');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;

    // Access uploaded files
    const image = req.files?.image ? req.files.image[0].path : null;
    const bannerBackgroundImage = req.files?.bannerBackgroundImage
      ? req.files.bannerBackgroundImage[0].path
      : null;

    if (!image || !bannerBackgroundImage) {
      return res.status(400).json({ message: 'Both image and bannerBackgroundImage are required' });
    }

    const product = new Product({
      title,
      subtitle,
      description,
      image,
      banner: {
        backgroundImage: bannerBackgroundImage,
        title: subtitle, // Example: Using subtitle as the banner title
      },
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};


// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    const updatedData = { title, subtitle, description };

    if (req.files?.image) {
      updatedData.image = req.files.image[0].path;
    }

    if (req.files?.bannerBackgroundImage) {
      updatedData.banner = {
        backgroundImage: req.files.bannerBackgroundImage[0].path,
        title: subtitle, // Example: Using subtitle as the banner title
      };
    }

    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
