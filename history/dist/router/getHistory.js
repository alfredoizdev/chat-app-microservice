"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getHistoryController_1 = require("../controllers/getHistoryController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
const getHistory = router.get("/api/history", authMiddleware_1.default, getHistoryController_1.getHistoryController);
exports.default = getHistory;
