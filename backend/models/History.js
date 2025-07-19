const mongoose = require('mongoose');

// Define the schema for point claim history
const historySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // References the User model
  },
  points: { 
    type: Number, 
    required: true // Points must be provided
  },
  claimedAt: { 
    type: Date, 
    default: Date.now // Automatically set to current time
  },
});

// Export the model (prevents overwrite in dev mode)
module.exports = mongoose.models.History || mongoose.model('History', historySchema);
