const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      image: { type: String}, // Header image path or URL
    },
    addresses: [
      {
        title: { type: String, required: true },
        details: { type: String, required: true },
      },
    ],
    phones: [
      {
        title: { type: String, required: true },
        number: { type: String, required: true },
      },
    ],
    fax: { type: String, required: true }, // Fax number
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactUs', contactSchema);
