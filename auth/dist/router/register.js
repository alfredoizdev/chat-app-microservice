"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const express_1 = require("express");
const registerController_1 = require("../controllers/registerController");
const router = (0, express_1.Router)();
// Register User
exports.registration = router.post("/register", registerController_1.registerUser);
