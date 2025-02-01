const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, required: true }, // Header title
      subtitle: { type: String, required: true }, // Header subtitle
      image: { type: String, required: true }, // Header image URL or path
    },
    title: { type: String, required: true }, // Blog title
    content: { type: String, required: true }, // Blog content
    image: { type: String, required: true }, // Blog image URL or path
    author: { type: String, required: true }, // Author's name
    category: { type: String, required: true }, // Blog category
    publishedDate: { type: Date, required: true }, // Publish date
    metaInfo: {
      comments: { type: String, required: true }, // Comments information
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Blog', blogSchema);
