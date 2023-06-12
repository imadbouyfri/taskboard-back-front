const express = require("express");
const router = express.Router();
const {
    allGroups,
    createGroup,
    groupDelete,
    groupUpdate
} = require("../controllers/groupController");

router.get("/", allGroups);
router.post("/", createGroup);
router.delete("/:id", groupDelete);
router.patch("/:id", groupUpdate);

module.exports = router;