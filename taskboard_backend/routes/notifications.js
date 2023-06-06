const express = require("express");
const router = express.Router();
const {
    getAllNotifications,
    createNotification,
    deleteNotifications
} = require("../controllers/notificationController");

router.get("/:userId", getAllNotifications);
router.delete("/:userId", deleteNotifications);
router.post("/", createNotification);

module.exports = router;