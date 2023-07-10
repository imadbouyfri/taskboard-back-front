"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/LabelController"),
  createLabel = _require.createLabel,
  getLabelOfCard = _require.getLabelOfCard,
  updateLabel = _require.updateLabel;
router.post("/", createLabel);
router.get("/:cardId", getLabelOfCard);
router.patch("/:cardId", updateLabel);
module.exports = router;