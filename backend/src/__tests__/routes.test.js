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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const appRouter_1 = __importDefault(require("../Routes/appRouter")); // adjust path as needed
const prisma_1 = __importDefault(require("../db/prisma"));
const vitest_1 = require("vitest");
// Mock prisma
vitest_1.vi.mock('../db/prisma', () => ({
    default: {
        user: {
            findMany: vitest_1.vi.fn(),
            create: vitest_1.vi.fn(),
        },
    },
}));
// Create Express app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', appRouter_1.default);
(0, vitest_1.describe)('API Routes', () => {
    (0, vitest_1.beforeAll)(() => {
        // Setup before all tests
    });
    (0, vitest_1.afterAll)(() => {
        // Cleanup after all tests
    });
    (0, vitest_1.beforeEach)(() => {
        // Clear all mocks before each test
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('GET /', () => {
        (0, vitest_1.it)('should return welcome message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200);
            (0, vitest_1.expect)(response.body).toEqual({ message: 'Hello from the backend!' });
        }));
    });
    (0, vitest_1.describe)('GET /api', () => {
        (0, vitest_1.it)('should return list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [
                { id: 1, name: 'User1', time: 100, map: 'MAP1' },
                { id: 2, name: 'User2', time: 200, map: 'MAP2' },
            ];
            prisma_1.default.user.findMany.mockResolvedValue(mockUsers);
            const response = yield (0, supertest_1.default)(app)
                .get('/api')
                .expect('Content-Type', /json/)
                .expect(200);
            (0, vitest_1.expect)(response.body).toEqual(mockUsers);
            (0, vitest_1.expect)(prisma_1.default.user.findMany).toHaveBeenCalled();
        }));
    });
    (0, vitest_1.describe)('GET /leaderboard/:id', () => {
        (0, vitest_1.it)('should return leaderboard for MAP1', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockLeaderboard = [
                { id: 1, name: 'Player1', time: 100, map: 'MAP1' },
                { id: 2, name: 'Player2', time: 150, map: 'MAP1' },
            ];
            prisma_1.default.user.findMany.mockResolvedValue(mockLeaderboard);
            const response = yield (0, supertest_1.default)(app)
                .get('/leaderboard/1')
                .expect('Content-Type', /json/)
                .expect(200);
            (0, vitest_1.expect)(response.body).toEqual(mockLeaderboard);
            (0, vitest_1.expect)(prisma_1.default.user.findMany).toHaveBeenCalledWith({
                where: { map: 'MAP1' },
                orderBy: { time: 'asc' },
            });
        }));
        (0, vitest_1.it)('should handle errors when fetching leaderboard', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findMany.mockRejectedValue(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app)
                .get('/leaderboard/1')
                .expect('Content-Type', /json/)
                .expect(500);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Failed to fetch leaderboard' });
        }));
    });
    (0, vitest_1.describe)('POST /leaderboard', () => {
        (0, vitest_1.it)('should create new leaderboard entry', () => __awaiter(void 0, void 0, void 0, function* () {
            const newEntry = {
                username: 'NewPlayer',
                time: 120,
                mapId: '1',
            };
            prisma_1.default.user.create.mockResolvedValue({
                id: 1,
                name: newEntry.username,
                time: newEntry.time,
                map: 'MAP1',
            });
            const response = yield (0, supertest_1.default)(app)
                .post('/leaderboard')
                .send(newEntry)
                .expect('Content-Type', /json/)
                .expect(201);
            (0, vitest_1.expect)(response.body).toEqual({ message: 'User added to leaderboard' });
            (0, vitest_1.expect)(prisma_1.default.user.create).toHaveBeenCalledWith({
                data: {
                    name: newEntry.username,
                    time: newEntry.time,
                    map: 'MAP1',
                },
            });
        }));
        (0, vitest_1.it)('should handle errors when creating leaderboard entry', () => __awaiter(void 0, void 0, void 0, function* () {
            const newEntry = {
                username: 'NewPlayer',
                time: 120,
                mapId: '1',
            };
            prisma_1.default.user.create.mockRejectedValue(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app)
                .post('/leaderboard')
                .send(newEntry)
                .expect('Content-Type', /json/)
                .expect(500);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Failed to add user to leaderboard' });
        }));
    });
});
