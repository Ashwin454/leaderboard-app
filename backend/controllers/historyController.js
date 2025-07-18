const ClaimHistory = require('../models/claimHistory');

exports.getHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate('userId', 'name')
      .sort({ timestamp: -1 })
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
