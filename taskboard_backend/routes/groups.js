const express = require("express");
const router = express.Router();
const {
    allGroups,
    createGroup,
    groupDelete,
    groupUpdate
} = require("../controllers/groupController");
const { protect } = require('../middleware/authMiddleware');
router.get("/", protect, allGroups);
router.post("/", createGroup);
router.delete("/:id", groupDelete);
router.patch("/:id", groupUpdate);

module.exports = router;