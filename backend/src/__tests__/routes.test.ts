import request from 'supertest';
import express from 'express';
import router from '../Routes/appRouter'; // adjust path as needed
import prisma from '../db/prisma';
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';

// Mock prisma
vi.mock('../db/prisma', () => ({
  default: {
    user: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Create Express app instance
const app = express();
app.use(express.json());
app.use('/', router);

describe('API Routes', () => {
  beforeAll(() => {
    // Setup before all tests
  });

  afterAll(() => {
    // Cleanup after all tests
  });

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({ message: 'Hello from the backend!' });
    });
  });

  describe('GET /api', () => {
    it('should return list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'User1', time: 100, map: 'MAP1' },
        { id: 2, name: 'User2', time: 200, map: 'MAP2' },
      ];

      (prisma.user.findMany as any).mockResolvedValue(mockUsers);

      const response = await request(app)
        .get('/api')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('GET /leaderboard/:id', () => {
    it('should return leaderboard for MAP1', async () => {
      const mockLeaderboard = [
        { id: 1, name: 'Player1', time: 100, map: 'MAP1' },
        { id: 2, name: 'Player2', time: 150, map: 'MAP1' },
      ];

      (prisma.user.findMany as any).mockResolvedValue(mockLeaderboard);

      const response = await request(app)
        .get('/leaderboard/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockLeaderboard);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { map: 'MAP1' },
        orderBy: { time: 'asc' },
      });
    });

    it('should handle errors when fetching leaderboard', async () => {
      (prisma.user.findMany as any).mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/leaderboard/1')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toEqual({ error: 'Failed to fetch leaderboard' });
    });
  });

  describe('POST /leaderboard', () => {
    it('should create new leaderboard entry', async () => {
      const newEntry = {
        username: 'NewPlayer',
        time: 120,
        mapId: '1',
      };

      (prisma.user.create as any).mockResolvedValue({
        id: 1,
        name: newEntry.username,
        time: newEntry.time,
        map: 'MAP1',
      });

      const response = await request(app)
        .post('/leaderboard')
        .send(newEntry)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual({ message: 'User added to leaderboard' });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: newEntry.username,
          time: newEntry.time,
          map: 'MAP1',
        },
      });
    });

    it('should handle errors when creating leaderboard entry', async () => {
      const newEntry = {
        username: 'NewPlayer',
        time: 120,
        mapId: '1',
      };

      (prisma.user.create as any).mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/leaderboard')
        .send(newEntry)
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toEqual({ error: 'Failed to add user to leaderboard' });
    });
  });
});