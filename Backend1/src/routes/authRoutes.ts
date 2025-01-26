import express from 'express';
import { register, login } from '../controllers/authController';
import { wrapAsync } from '../utils/wrapAsync'; // Import the wrapAsync utility

const router = express.Router();

// Authentication Endpoints
router.post('/register', wrapAsync(register)); // Wrap async register function
router.post('/login', wrapAsync(login)); // Wrap async login function

export default router;
