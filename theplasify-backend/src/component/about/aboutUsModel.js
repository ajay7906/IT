const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // URL or file path for the icon
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);
