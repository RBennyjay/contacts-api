const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'], // Added custom error message
    trim: true // Removes whitespace from both ends of a string
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'], // Added custom error message
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'], // Added custom error message
    unique: true, // Ensures email addresses are unique
    lowercase: true, // Converts email to lowercase before saving
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address.'] // Basic email format validation
  },
 
  favoriteColor: {
    type: String,
    required: [true, 'Favorite color is required.'], // Added custom error message
    trim: true
  },
  birthday: {
    type: Date, // Stores date and time
    required: [true, 'Birthday is required.'] // Added custom error message
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Contact', contactSchema);