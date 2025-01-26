"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Notes Endpoints (Protected by authMiddleware)
router.get('/', authMiddleware_1.default, noteController_1.getNotes); // Get all notes for the authenticated user
router.post('/', authMiddleware_1.default, noteController_1.createNote); // Create a new note
router.patch('/:id', authMiddleware_1.default, noteController_1.updateNote); // Update a specific note
router.delete('/:id', authMiddleware_1.default, noteController_1.deleteNote); // Delete a specific note
exports.default = router;
