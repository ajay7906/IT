const mongoose = require('mongoose');

const businessSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: [String], required: true }, // Array of paragraphs
  skillsHeading: { type: String, required: true }, // Heading for skills
  skillsLeft: { type: [String], required: true }, // Array of strings
  skillsRight: { type: [String], required: true }, // Array of strings
}, { timestamps: true });

const BusinessSection = mongoose.model('BusinessSection', businessSectionSchema);

module.exports = BusinessSection;
