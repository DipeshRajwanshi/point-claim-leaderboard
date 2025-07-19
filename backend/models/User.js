const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 0 
  },
});

// Export the model 
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
