const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
  {
    title: { type: String},
    description: { type: String },
    bgImage: { type: String }, // Store the path to the uploaded image
  },
  { timestamps: true }
);

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
