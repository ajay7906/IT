const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }, // Image path or URL for the tab
});

const applicationServicesSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      image: { type: String, required: true }, // Header image
    },
    content: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      secondaryImage: { type: String, required: true }, // Secondary image
    },
    tabs: [tabSchema], // Array of tabs
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('ApplicationServices', applicationServicesSchema);
