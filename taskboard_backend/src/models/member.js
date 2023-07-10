const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    // firstName: {
      // type: String,
      // required: [true, 'Please enter your firstname']
    // },
    name: {
      type: String,
      required: [true, 'Please enter your lastname']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    color: {
        type: Number,
        default: Math.floor(Math.random()*16777215).toString(16)
    },
    role: {
      type: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      }
    ],
    cardPermissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CardPermission",
      },
    ],
    // boards: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Board",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
