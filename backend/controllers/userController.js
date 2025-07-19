const User = require('../models/User');

//  Create a new user
exports.createUser = async (req, res) => {
  try {
    // Create user with name from request body
    const user = new User({ name: req.body.name });

    // Save user to database
    await user.save();

    // Respond with created user
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

//  Get all users sorted by total points (descending)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
