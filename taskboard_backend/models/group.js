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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
        }
    ],
    members: [
        {
            member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Member",
            },
            role: {
                type: String,
                enum: ["admin", "member"],
                default: "member",
            },
        },
    ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);