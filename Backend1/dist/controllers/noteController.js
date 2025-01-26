"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const noteModel_1 = __importDefault(require("../models/noteModel"));
// Get all notes for the authenticated user
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const notes = yield noteModel_1.default.find({ userId });
        res.json(notes);
    }
    catch (e) {
        const error = e;
        res.status(500).json({ message: error.message });
    }
});
exports.getNotes = getNotes;
// Create a new note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { title, description, status } = req.body;
        if (!title || !description || !status) {
            res.status(500).json({ message: "All field are required" });
        }
        const newNote = yield noteModel_1.default.create({ title, description, userId, status });
        res.status(201).json(newNote);
    }
    catch (e) {
        const error = e;
        res.status(500).json({ message: error.message });
    }
});
exports.createNote = createNote;
// Update a specific note
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        const { title, description } = req.body;
        const note = yield noteModel_1.default.findOneAndUpdate({ _id: noteId, userId }, // Ensure the note belongs to the authenticated user
        { title, description }, { new: true, runValidators: true });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.json(note);
    }
    catch (e) {
        const error = e;
        res.status(500).json({ message: error.message });
    }
});
exports.updateNote = updateNote;
// Delete a specific note
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        const note = yield noteModel_1.default.findOneAndDelete({ _id: noteId, userId });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.json({ message: 'Note deleted successfully' });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ message: error.message });
    }
});
exports.deleteNote = deleteNote;
