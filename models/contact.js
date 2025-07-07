const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  favoriteColor: String
});

module.exports = mongoose.model('Contact', contactSchema);
