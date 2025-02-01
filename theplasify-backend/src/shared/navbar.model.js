// File: models/Navbar.js
const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema(
  {
    tollFree: { type: String },
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
    },
    services: {
      applicationServices: { type: String },
      businessServices: { type: String},
      technologyTrainings: { type: String },
      globalStaffing: { type: String },
      staffAugmentation: { type: String},
    },
    otherLinks: {
      home: { type: String },
      aboutUs: { type: String },
      products: { type: String },
      career: { type: String },
      blog: { type: String },
      contactUs: { type: String},
    },
    logo: { type: String }, // Field for storing logo URL
    icon: { type: String }, // Field for storing icon URL
  },
  { timestamps: true }
);

module.exports = mongoose.model('Navbar', headerSchema);