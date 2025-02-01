const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true }, // URL or file path
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String},
}, { timestamps: true });

module.exports = mongoose.model('BannerAbout', bannerSchema);
