const express = require("express");
const router = express.Router();
const {
    getAllNotifications,
    createNotification,
    updateNotificationReadStatus,
    deleteNotifications
} = require("../controllers/notificationController");

router.get("/:userId", getAllNotifications);
router.delete("/:userId", deleteNotifications);
router.put("/:userId", updateNotificationReadStatus);
router.post("/", createNotification);

module.exports = router;