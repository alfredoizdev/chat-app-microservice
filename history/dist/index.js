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
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./mongodb/connection"));
const getHistory_1 = __importDefault(require("./router/getHistory"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(getHistory_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(4005, () => {
        console.log("Auth service running on port 4005");
    });
    try {
        yield (0, connection_1.default)();
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process with failure code
    }
});
startServer();
