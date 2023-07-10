"use strict";

var mongoose = require("mongoose");
var historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card"
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  },
  action: {
    type: String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("CardHistory", historySchema);