"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashPassword = (password) => {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const iterations = 10000;
    const keylen = 64;
    const digest = "sha512";
    const hashedPassword = crypto_1.default
        .pbkdf2Sync(password, salt, iterations, keylen, digest)
        .toString("hex");
    return `${iterations}:${salt}:${hashedPassword}`;
};
exports.hashPassword = hashPassword;
const verifyPassword = (password, originalHash) => {
    const [iterations, salt, originalHashedPassword] = originalHash.split(":");
    const keylen = 64;
    const digest = "sha512";
    const hashedPassword = crypto_1.default
        .pbkdf2Sync(password, salt, parseInt(iterations), keylen, digest)
        .toString("hex");
    return hashedPassword === originalHashedPassword;
};
exports.verifyPassword = verifyPassword;
