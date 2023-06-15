const express = require("express");
const router = express.Router();
const {
    allGroups,
    createGroup,
    groupDelete,
    groupUpdate,
    groupById
} = require("../controllers/groupController");
const { protect } = require('../middleware/authMiddleware');
router.get("/", protect, allGroups);
router.get("/:id", groupById);
router.post("/", protect, createGroup);
router.delete("/:id", groupDelete);
router.patch("/:id", groupUpdate);

module.exports = router;