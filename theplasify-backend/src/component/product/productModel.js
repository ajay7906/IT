const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL or path to the image
  banner: {
    backgroundImage: { type: String, required: true }, // URL or path to the banner background
    title: { type: String, required: true }, // Banner title
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
