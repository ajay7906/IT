const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  images: { type: [String] },
  title: { type: String},
  description: { type: String },
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
