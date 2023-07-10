"use strict";

var mongoose = require("mongoose");
var boardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  descData: {
    type: String
  },
  active: {
    type: Boolean,
    "default": true
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "List"
  }],
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission"
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Board", boardSchema);