"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/LabelController"),
  createLabel = _require.createLabel,
  updateLabel = _require.updateLabel,
  getLabelsOfBoard = _require.getLabelsOfBoard;

// const { protect } = require('../middleware/authMiddleware');
router.post("/", createLabel);
router.patch("/:id", updateLabel);
router.get("/:board", getLabelsOfBoard);
module.exports = router;