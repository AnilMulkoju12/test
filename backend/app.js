import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/users', userRouter);

export default app;
