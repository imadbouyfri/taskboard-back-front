// const { MongoClient } = require ("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//Import routes
const boardRoutes = require("./routes/boards");
const cardRoutes = require("./routes/cards");
const listRoutes = require("./routes/lists");
const memberRoutes = require("./routes/members");
const permissionRoutes = require("./routes/permissions");
const cardPermissionRoutes = require("./routes/cardPermissions");
const listHistoryRoutes = require("./routes/listHistory");
const cardHistoryRoutes = require("./routes/cardHistory");
const labelRoutes = require("./routes/labels");
const notificationRoutes = require("./routes/notifications");
const groupRoutes = require("./routes/groups");

//Config
require("dotenv").config();
const app = express();

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

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

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.get((req, res) => {
  res.status(200).send("404 Page not found");
});

app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1' ,() => {
  console.log(`Server listening on port ${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}...`);
});
