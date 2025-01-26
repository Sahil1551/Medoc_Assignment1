"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Import routes
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes")); // Assuming you also have noteRoutes
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // For parsing JSON request bodies
// Routes
app.use('/auth', authRoutes_1.default); // Register routes for authentication
app.use('/notes', noteRoutes_1.default); // Assuming you have noteRoutes defined similarly
app.use('/admin', adminRoutes_1.default);
exports.default = app;
