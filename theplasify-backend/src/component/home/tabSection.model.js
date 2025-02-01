const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
  title: { type: String },
  heading: { type: String },
  description: { type: String },
  image: { type: String }, // Field to store the image path
}, { timestamps: true });

const Tab = mongoose.model('Tab', tabSchema);

module.exports = Tab;
