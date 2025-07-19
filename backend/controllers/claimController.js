const History = require('../models/history');
const User = require('../models/User');

// Claim random points (1–10) and store in history
exports.claimPoints = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Generate random points between 1–10
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update user's total points
    user.totalPoints += randomPoints;
    await user.save();

    // Save claim in history
    const history = new History({ userId, points: randomPoints });
    await history.save();

    // Emit updated leaderboard and history to all clients via Socket.IO
    const io = req.app.get('io');
    const allUsers = await User.find().sort({ totalPoints: -1 });
    const allHistory = await History.find()
      .populate('userId', 'name')
      .sort({ claimedAt: -1 });

    io.emit('leaderboard_update', allUsers);
    io.emit('history_update', allHistory);

    // Respond with result
    res.json({
      message: 'Points claimed',
      points: randomPoints,
      user,
    });

  } catch (err) {
    console.error('Error claiming points:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

//  Get paginated claim history
exports.getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Get total count and paginated results
    const total = await History.countDocuments();
    const history = await History.find()
      .populate('userId', 'name') // Join with user name
      .sort({ claimedAt: -1 })    // Newest first
      .skip(skip)
      .limit(limit);

    // Respond with paginated history
    res.json({
      history,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error('Error fetching history:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
