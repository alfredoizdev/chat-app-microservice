"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./mongodb/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send("Username and password are required");
    }
    const accessToken = jsonwebtoken_1.default.sign({ username: user.username }, "mysecret", {
        expiresIn: "1h",
    });
    res.status(200).json({ accessToken });
}));
const connectToMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.default)();
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
});
connectToMongo();
app.listen(4003, () => {
    console.log("Auth service running port 4003");
});
