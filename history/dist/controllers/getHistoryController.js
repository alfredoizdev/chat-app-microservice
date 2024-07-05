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
exports.getHistoryController = void 0;
const History_1 = __importDefault(require("../models/History"));
const getHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId, senderId } = req.query;
    try {
        const history = yield History_1.default.find({
            $or: [
                { senderId: receiverId, receiverId: senderId },
                { senderId: senderId, receiverId: receiverId },
            ],
        });
        res.status(200).json(history);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getHistoryController = getHistoryController;
