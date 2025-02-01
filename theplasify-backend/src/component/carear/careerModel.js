const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Career section title
    headerImage: { type: String, required: true }, // Header image URL or path
    sections: [
      {
        title: { type: String, required: true }, // Section title
        content: { type: String, required: true }, // Section content
        image: { type: String, required: true }, // Image URL or path
      },
    ],
    jobs: [
      {
        title: { type: String}, // Job title
        category: { type: String}, // Job category (e.g., Engineering, Admin)
        type: { type: String }, // Job type (e.g., Full Time, Part Time)
        description: { type: String}, // Job description
        location: { type: String}, // Job location
        salary: { type: String }, // Salary range (optional)
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
