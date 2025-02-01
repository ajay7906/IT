const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  quickLinks: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  services: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  outsourcingServices: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    socialLinks: [
      {
        platform: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);
