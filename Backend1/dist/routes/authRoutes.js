"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const wrapAsync_1 = require("../utils/wrapAsync"); // Import the wrapAsync utility
const router = express_1.default.Router();
// Authentication Endpoints
router.post('/register', (0, wrapAsync_1.wrapAsync)(authController_1.register)); // Wrap async register function
router.post('/login', (0, wrapAsync_1.wrapAsync)(authController_1.login)); // Wrap async login function
exports.default = router;
