"use strict";

var mongoose = require("mongoose");
var labelSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  color: {
    type: String
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Label", labelSchema);