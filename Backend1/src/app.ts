import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'; // Import routes
import noteRoutes from './routes/noteRoutes'; // Assuming you also have noteRoutes
import adminRoutes from './routes/adminRoutes'
dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use('/auth', authRoutes); // Register routes for authentication
app.use('/notes', noteRoutes); // Assuming you have noteRoutes defined similarly
app.use('/admin',adminRoutes)
export default app;
