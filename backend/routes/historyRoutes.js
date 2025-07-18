const express = require("express");
const { getHistory } = require("../controllers/historyController");
const router = express.Router();

router.route("/get").get(getHistory);

module.exports = router;
