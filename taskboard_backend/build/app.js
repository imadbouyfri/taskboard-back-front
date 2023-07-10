"use strict";

// const { MongoClient } = require ("mongodb");
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");

//Import routes
var boardRoutes = require("./routes/boards");
var cardRoutes = require("./routes/cards");
var listRoutes = require("./routes/lists");
var memberRoutes = require("./routes/members");
var permissionRoutes = require("./routes/permissions");
var cardPermissionRoutes = require("./routes/cardPermissions");
var listHistoryRoutes = require("./routes/listHistory");
var cardHistoryRoutes = require("./routes/cardHistory");
var labelRoutes = require("./routes/labels");
var notificationRoutes = require("./routes/notifications");
var groupRoutes = require("./routes/groups");

//Config
require("dotenv").config();
var app = express();

//DB Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("db connected");
})["catch"](function (err) {
  return console.log(err);
});

//middleware & static files
app.use(express.json());
app.use(cors());

//Routes Middleware
app.use("/board", boardRoutes);
app.use("/card", cardRoutes);
app.use("/list", listRoutes);
app.use("/member", memberRoutes);
app.use("/permission", permissionRoutes);
app.use("/cardPermission", cardPermissionRoutes);
app.use("/listHistory", listHistoryRoutes);
app.use("/cardHistory", cardHistoryRoutes);
app.use("/label", labelRoutes);
app.use("/notification", notificationRoutes);
app.use("/group", groupRoutes);
app.get("/", function (req, res) {
  res.status(200).send("Hello");
});
app.get(function (req, res) {
  res.status(200).send("404 Page not found");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port ".concat(process.env.PORT || 3000, "..."));
});