const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    read: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);