const express = require("express");
const router = express.Router();
const {
    allGroups,
    createGroup,
    groupDelete
} = require("../controllers/groupController");

router.get("/", allGroups);
router.post("/", createGroup);
router.delete("/:id", groupDelete);

module.exports = router;