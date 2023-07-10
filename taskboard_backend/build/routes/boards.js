"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/boardController"),
  createBoard = _require.createBoard,
  boardById = _require.boardById,
  getAllBoards = _require.getAllBoards,
  boardDelete = _require.boardDelete,
  boardUpdate = _require.boardUpdate,
  listsOfBoard = _require.listsOfBoard,
  assignPermissionToBoard = _require.assignPermissionToBoard,
  allBoards = _require.allBoards;
var _require2 = require('../middleware/authMiddleware'),
  protect = _require2.protect;
router.get("/", protect, getAllBoards);
router.get("/:id", boardById);
router.get("/boards", allBoards);
router.post("/create", protect, createBoard);
router["delete"]("/:id", protect, boardDelete);
router.patch("/:id", protect, boardUpdate);
router.get("/:boardId/lists", protect, listsOfBoard);
router.post("/permission/:boardId/:memberId", protect, assignPermissionToBoard);
// router.patch("/:memberId/delete", protect, deleteMemberInBoard);

module.exports = router;