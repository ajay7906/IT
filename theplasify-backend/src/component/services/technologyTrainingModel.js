const mongoose = require('mongoose');

const technologyTrainingSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      image: { type: String, required: true }, // Path or URL for the header image
    },
    content: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true }, // Path or URL for the content image
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model('TechnologyTraining', technologyTrainingSchema);
