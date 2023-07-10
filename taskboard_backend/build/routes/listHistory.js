"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/listHistoryController"),
  createHistory = _require.createHistory,
  getHistory = _require.getHistory;
router.post("/", createHistory);
router.get("/:boardId", getHistory);
module.exports = router;