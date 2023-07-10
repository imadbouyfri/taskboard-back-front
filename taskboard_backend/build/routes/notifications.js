"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/notificationController"),
  getAllNotifications = _require.getAllNotifications,
  createNotification = _require.createNotification,
  updateNotificationReadStatus = _require.updateNotificationReadStatus,
  deleteNotifications = _require.deleteNotifications;
router.get("/:userId", getAllNotifications);
router["delete"]("/:userId", deleteNotifications);
router.put("/:userId", updateNotificationReadStatus);
router.post("/", createNotification);
module.exports = router;