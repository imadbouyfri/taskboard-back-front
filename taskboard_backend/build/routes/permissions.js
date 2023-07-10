"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/permissionController"),
  allPermissions = _require.allPermissions,
  addPermission = _require.addPermission,
  updatePermission = _require.updatePermission,
  userPermissions = _require.userPermissions;
var _require2 = require('../middleware/authMiddleware'),
  protect = _require2.protect;
router.get("/", allPermissions);
router.post("/", protect, addPermission);
router.patch("/", updatePermission);
router.get("/:member", userPermissions);
module.exports = router;