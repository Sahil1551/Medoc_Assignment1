import { Request, Response } from 'express';
import Note from '../models/noteModel';

// Get all notes for the authenticated user
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { id: string }).id;
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ message: error.message });
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { id: string }).id;
    const { title, description,status } = req.body;
    if(!title||!description||!status){
      res.status(500).json({message:"All field are required"})
    }
    const newNote = await Note.create({ title, description, userId ,status});
    res.status(201).json(newNote);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ message: error.message });
  }
};

// Update a specific note
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { id: string }).id;
    const noteId = req.params.id;
    const { title, description } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId }, // Ensure the note belongs to the authenticated user
      { title, description },
      { new: true, runValidators: true }
    );

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return 
    }

    res.json(note);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific note
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { id: string }).id;
    const noteId = req.params.id;

    const note = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
       res.status(404).json({ message: 'Note not found' });
       return
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ message: error.message });
  }
};
