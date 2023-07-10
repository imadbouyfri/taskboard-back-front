"use strict";

var mongoose = require("mongoose");
var memberSchema = new mongoose.Schema({
  role: {
    type: String
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Permission", memberSchema);