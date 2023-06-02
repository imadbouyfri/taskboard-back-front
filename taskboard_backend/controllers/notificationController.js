const Notification = require("../models/notification");

// Get all notifications for a user
exports.getAllNotifications = async (req, res) => {
    try {
      const userId = req.params.userId;
      const notifications = await Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate({
          path: "admin",
          model: "Member",
          select: "name color",
        })
        .populate({
          path: "board",
          model: "Board",
          select: "name",
        });
  
      if (notifications.length === 0) {
        return res.status(200).json({ message: "No notifications found." });
      }
  
      res.json(notifications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get notifications." });
    }
  };

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
      const { user, action, board, admin } = req.body;
  
      const newNotification = new Notification({
        user,
        action,
        board,
        admin,
      });
  
      await newNotification.save();
      res.status(201).json({ message: "Notification created successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to create notification." });
    }
  };
