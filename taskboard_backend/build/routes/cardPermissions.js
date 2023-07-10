"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/cardPermissionController"),
  allPermissions = _require.allPermissions,
  addPermission = _require.addPermission,
  getCardPermissionsOfMember = _require.getCardPermissionsOfMember;

// const { protect } = require('../middleware/authMiddleware');

router.get("/", allPermissions);
router.post("/", addPermission);
router.get("/:member", getCardPermissionsOfMember);
module.exports = router;