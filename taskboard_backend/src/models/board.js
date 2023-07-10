const mongoose = require("mongoose");


const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    descData: {
      type: String
    },
    startDate :{
        type:Date,
        default: Date.now()
    },
    endDate :{
        type:Date
    },
    active: {
      type: Boolean,
      default: true
    },
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      }
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Board", boardSchema);
