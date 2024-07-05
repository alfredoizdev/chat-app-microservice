"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    let secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("Is not set env for token");
        return res.status(400).json({ msg: "Is not set env for token" });
    }
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded === "string") {
            return res.status(401).json({ msg: "Token is not valid" });
        }
        next();
    }
    catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
exports.default = authMiddleware;
