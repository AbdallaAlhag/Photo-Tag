// Easier backend so I'm not going to split up the routes into separate files
// so no query file or controller file, although db enum is new to me

import express from 'express';
const router = express.Router();
import prisma from '../db/prisma';
import { MapType } from '@prisma/client';


router.get('/api', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });  

router.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});


router.get('/leaderboard/:id', async (req, res) => {
  const { id } = req.params;
  let MAP: MapType;
  switch (id) {
    case '1':
      MAP = 'MAP1' as MapType; // explicitly cast to MapType
      break;
    case '2':
      MAP = 'MAP2' as MapType; // explicitly cast to MapType
      break;
    case '3':
      MAP = 'MAP3' as MapType; // explicitly cast to MapType
      break;
    default:
      MAP = 'MAP1' as MapType; // explicitly cast to MapType
  }
  try {
    const leaderboard = await prisma.user.findMany({
      where: {
        map: MAP,
      },
      orderBy: {
        time: 'asc',
      }
    });
    console.log(leaderboard);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
})

router.post('/leaderboard', async (req, res) => {
  const { username, time, mapId } = req.body;
  let MAP: MapType;
  switch (mapId) {
    case '1':
      MAP = 'MAP1' as MapType; 
      break;
    case '2':
      MAP = 'MAP2' as MapType; 
      break;
    case '3':
      MAP = 'MAP3' as MapType;
      break;
    default:
      MAP = 'MAP1' as MapType; 
  }
  try {
    await prisma.user.create({
      data: {
        name: username,
        time: time,
        map: MAP,
      },
    });
    res.status(201).json({ message: 'User added to leaderboard' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user to leaderboard' });
    return;
  }
})


export default router;