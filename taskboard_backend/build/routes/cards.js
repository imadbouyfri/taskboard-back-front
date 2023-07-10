"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/cardController"),
  createCard = _require.createCard,
  cardById = _require.cardById,
  getAllCards = _require.getAllCards,
  cardDelete = _require.cardDelete,
  cardUpdate = _require.cardUpdate,
  getCardsOfBoard = _require.getCardsOfBoard;
var _require2 = require('../middleware/authMiddleware'),
  protect = _require2.protect;

// router.post("/create", createCard);
router.post("/create", protect, createCard);
router.get("/", getAllCards);
router.get("/:id", cardById);
router.get("/:board/:member", getCardsOfBoard);
router["delete"]("/:id", cardDelete);
router.patch("/:id", cardUpdate);
module.exports = router;