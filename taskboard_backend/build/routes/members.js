"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/memberController"),
  getAllMembers = _require.getAllMembers,
  registerMember = _require.registerMember,
  loginMember = _require.loginMember,
  getMe = _require.getMe,
  getMembersOfBoard = _require.getMembersOfBoard,
  getMembersOfGroup = _require.getMembersOfGroup,
  updateMember = _require.updateMember;
var _require2 = require('../middleware/authMiddleware'),
  protect = _require2.protect;
router.post("/", registerMember);
router.post("/login", loginMember);
router.patch("/:memberId", updateMember);
router.get("/me", getMe);
router.get("/", getAllMembers);
router.get("/:boardId", getMembersOfBoard);
router.get("/group/:groupId", getMembersOfGroup);
module.exports = router;