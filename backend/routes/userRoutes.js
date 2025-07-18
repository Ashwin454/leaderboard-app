const express = require('express');
const { getUsers, createUser, claimPoints } = require('../controllers/userController');
const router = express.Router();

router.route('/get').get(getUsers)
router.route('/create').post(createUser);
router.route('/claim').post(claimPoints);

module.exports = router;