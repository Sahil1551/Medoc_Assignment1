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
const authMiddleware_1 = require("../middlewares/authMiddleware");
const noteModel_1 = __importDefault(require("../models/noteModel"));
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.get("/notes", authMiddleware_1.validateAdminToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch only the required fields: title, _id, and status
        const notes = yield noteModel_1.default.find({}, { title: 1, status: 1 });
        res.status(200).json({ message: "Notes fetched successfully", data: notes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/users', authMiddleware_1.validateAdminToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}, { name: 1, email: 1 });
        // Send response with fetched data
        res.status(200).json({ message: "Users fetched successfully", data: users });
    }
    catch (e) {
        console.error("Error fetching users:", e);
        res.status(500).json({ message: e.message });
    }
}));
router.get('/users/:id', authMiddleware_1.validateAdminToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Fetch user by ID with specific fields
        const user = yield userModel_1.default.findById(id, { name: 1, email: 1 });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User fetched successfully", data: user });
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: error.message });
    }
}));
router.delete('/users/:id', authMiddleware_1.validateAdminToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Fetch user by ID with specific fields
        const user = yield userModel_1.default.findByIdAndDelete(id);
        if (user) {
            res.status(200).json({ message: "User Deleted successfully" });
            return;
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error Deleting user :", error);
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
