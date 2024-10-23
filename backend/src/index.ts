import express from 'express';
import dotenv from 'dotenv';
import appRouter from './Routes/appRouter';
import prisma from './db/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  
app.use("/", appRouter);

// The following code is for handling graceful shutdowns of the server
// We use these events to disconnect from the database before the process exits
// This is important because Prisma will otherwise throw an error when the process
// is killed, as it will not be able to properly disconnect from the database.

// Handle SIGINT (e.g. Ctrl+C in the terminal)
process.on('SIGINT', async () => {
  console.log('Received SIGINT, disconnecting from database');
  await prisma.$disconnect();
  process.exit(0);
});

// Handle SIGTERM (e.g. kill command in the terminal)
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, disconnecting from database');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
