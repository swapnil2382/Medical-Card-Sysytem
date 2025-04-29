const mongoose = require('mongoose');  // Use require instead of import

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  consultation_fees: Number,
  location: String,
  profile_picture_url: String,
  rating: Number,
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);  // Use module.exports instead of export default
