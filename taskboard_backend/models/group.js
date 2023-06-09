const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, 'Please enter a group name'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a group description'],
    },
    role: {
        type: String,
    },
    members: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        },
    ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);