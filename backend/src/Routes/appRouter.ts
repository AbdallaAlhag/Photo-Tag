import { Request, Response } from 'express';
import express from 'express';
const router = express.Router();
import prisma from '../db/prisma';


router.get('/api', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });  

router.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

export default router;