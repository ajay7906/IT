// File: models/GlobalStaffingModel.js

const mongoose = require('mongoose');

const globalStaffingSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      image: { type: String, required: true }, // Path or URL for the header image
    },
    sections: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    aiDrivenProcesses: [{ type: String, required: true }], // List of AI-driven processes
    serviceOfferings: [{ type: String, required: true }], // List of service offerings
    recruitmentPositions: {
      IT: { type: String, required: true },
      NonIT: { type: String, required: true },
      Engineering: { type: String, required: true },
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model('GlobalStaffing', globalStaffingSchema);
