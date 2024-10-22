import express from 'express';
import dotenv from 'dotenv';
import appRouter from './Routes/appRouter';

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


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
