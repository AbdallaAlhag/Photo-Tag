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
const dotenv_1 = __importDefault(require("dotenv"));
const appRouter_1 = __importDefault(require("./Routes/appRouter"));
const prisma_1 = __importDefault(require("./db/prisma"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/", appRouter_1.default);
// The following code is for handling graceful shutdowns of the server
// We use these events to disconnect from the database before the process exits
// This is important because Prisma will otherwise throw an error when the process
// is killed, as it will not be able to properly disconnect from the database.
// Handle SIGINT (e.g. Ctrl+C in the terminal)
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received SIGINT, disconnecting from database');
    yield prisma_1.default.$disconnect();
    process.exit(0);
}));
// Handle SIGTERM (e.g. kill command in the terminal)
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received SIGTERM, disconnecting from database');
    yield prisma_1.default.$disconnect();
    process.exit(0);
}));
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
