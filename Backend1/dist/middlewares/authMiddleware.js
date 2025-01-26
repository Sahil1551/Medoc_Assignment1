"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ADMIN_SECRET = process.env.ADMIN_SECRET || "your_admin_secret";
const validateAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized access" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ADMIN_SECRET);
        req.user = decoded; // Optionally attach decoded token info to the request
        next(); // Pass control to the next middleware
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.validateAdminToken = validateAdminToken;
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access Denied' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.user = decoded; // Attach the decoded token to `req.user`
        next(); // Pass control to the next middleware
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
exports.default = authMiddleware;
