"use strict";
// Easier backend so I'm not going to split up the routes into separate files
// so no query file or controller file, although db enum is new to me
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
const router = express_1.default.Router();
const prisma_1 = __importDefault(require("../db/prisma"));
router.get('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany();
    res.json(users);
}));
router.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});
router.get('/leaderboard/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let MAP;
    switch (id) {
        case '1':
            MAP = 'MAP1'; // explicitly cast to MapType
            break;
        case '2':
            MAP = 'MAP2'; // explicitly cast to MapType
            break;
        case '3':
            MAP = 'MAP3'; // explicitly cast to MapType
            break;
        default:
            MAP = 'MAP1'; // explicitly cast to MapType
    }
    try {
        const leaderboard = yield prisma_1.default.user.findMany({
            where: {
                map: MAP,
            },
            orderBy: {
                time: 'asc',
            }
        });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
}));
router.post('/leaderboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, time, mapId } = req.body;
    let MAP;
    switch (mapId) {
        case '1':
            MAP = 'MAP1';
            break;
        case '2':
            MAP = 'MAP2';
            break;
        case '3':
            MAP = 'MAP3';
            break;
        default:
            MAP = 'MAP1';
    }
    try {
        yield prisma_1.default.user.create({
            data: {
                name: username,
                time: time,
                map: MAP,
            },
        });
        res.status(201).json({ message: 'User added to leaderboard' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add user to leaderboard' });
        return;
    }
}));
exports.default = router;
