const express = require("express");
const router = express.Router();
const {
    getAllNotifications,
    createNotification,
} = require("../controllers/notificationController");

router.get("/:userId", getAllNotifications);
router.post("/", createNotification);

module.exports = router;