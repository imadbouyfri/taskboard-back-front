const express = require("express");
const router = express.Router();
const {
    allGroups,
    createGroup
} = require("../controllers/groupController");

router.get("/", allGroups);
router.post("/", createGroup);

module.exports = router;