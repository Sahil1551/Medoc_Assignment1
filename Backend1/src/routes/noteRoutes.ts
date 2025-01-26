import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Notes Endpoints (Protected by authMiddleware)
router.get('/', authMiddleware, getNotes); // Get all notes for the authenticated user
router.post('/', authMiddleware, createNote); // Create a new note
router.patch('/:id', authMiddleware, updateNote); // Update a specific note
router.delete('/:id', authMiddleware, deleteNote); // Delete a specific note

export default router;
