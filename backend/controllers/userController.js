const User = require('../models/user');
const ClaimHistory = require("../models/claimHistory");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const rankedUsers = users.map((user, index) => ({
      ...user._doc,
      rank: index + 1,
    }));
    res.json(rankedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const existingUser = await User.findOne({ name });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const points = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({ userId, points });
    await history.save();

    res.json({ points, totalPoints: user.totalPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}