"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/listController"),
  createList = _require.createList,
  getAllList = _require.getAllList,
  listById = _require.listById,
  listDelete = _require.listDelete,
  listUpdate = _require.listUpdate,
  createListInBoard = _require.createListInBoard,
  getListsFromBoard = _require.getListsFromBoard;
router.get("/", getAllList);
router.post("/board/:boardId", getListsFromBoard);
router.get("/:id", listById);
router.post("/create", createList);
router.post("/:boardId/create", createListInBoard);
router["delete"]("/:id", listDelete);
router.patch("/:id", listUpdate);
module.exports = router;