const Blog = require('./blogModel');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { header, title, content, author, category, publishedDate, metaInfo } = req.body;
    const image = req.file ? req.file.path : null;


    const blog = new Blog({
      header: JSON.parse(header),
      title,
      content,
      image,
      author,
      category,
      publishedDate,
      metaInfo: JSON.parse(metaInfo), // Parse metaInfo as JSON
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { header, title, content, author, category, publishedDate, metaInfo } = req.body;

    const updatedData = {
      header: JSON.parse(header),
      title,
      content,
      author,
      category,
      publishedDate,
      metaInfo: JSON.parse(metaInfo), // Parse metaInfo as JSON
    };

    if (req.file) {
      updatedData.image = req.file.path; // Update image if provided
    }

    const blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
