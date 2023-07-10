"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/groupController"),
  allGroups = _require.allGroups,
  createGroup = _require.createGroup,
  groupDelete = _require.groupDelete,
  groupUpdate = _require.groupUpdate,
  groupById = _require.groupById;
var _require2 = require('../middleware/authMiddleware'),
  protect = _require2.protect;
router.get("/", protect, allGroups);
router.get("/:id", groupById);
router.post("/", protect, createGroup);
router["delete"]("/:id", protect, groupDelete);
router.patch("/:id", protect, groupUpdate);
module.exports = router;