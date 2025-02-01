const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Tab title
    tabs: [
      {
        title: { type: String, required: true }, // Sub-tab title
        image: { type: String, required: true }, // Image URL or file path
        description: { type: String, required: true }, // Sub-tab description
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('TabProduct', tabSchema);
