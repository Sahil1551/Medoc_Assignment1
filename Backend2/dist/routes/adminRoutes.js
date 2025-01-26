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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AminModels_1 = __importDefault(require("../models/AminModels"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Audit_1 = __importDefault(require("../middleware/Audit"));
const axios_1 = __importDefault(require("axios"));
const AuditLogs_1 = __importDefault(require("../models/AuditLogs"));
const router = express_1.default.Router();
const BACKEND_1_URL = "http://localhost:5000";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "your_admin_secret";
let adminToken = "";
const extractAdminIdFromToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ADMIN_SECRET);
        return decoded.id || null;
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return null; // Return null if the token is invalid or expired
    }
};
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = yield AminModels_1.default.findOne({ email });
        if (existingAdmin) {
            res.status(400).json({ message: "Admin already exists" });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create a new admin
        const newAdmin = new AminModels_1.default({ name, email, password: hashedPassword });
        yield newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield AminModels_1.default.findOne({ email });
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id, role: "admin" }, ADMIN_SECRET, { expiresIn: "1h" });
        adminToken = token;
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!adminToken) {
        res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    try {
        // Fetch users from Backend 1
        const response = yield axios_1.default.get(`${BACKEND_1_URL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        });
        // If users are fetched successfully
        if (response.data && response.data.data) {
            const adminId = extractAdminIdFromToken(adminToken);
            if (!adminId) {
                res.status(401).json({ message: "Unauthorized: Invalid token" });
                return;
            }
            yield (0, Audit_1.default)("Fetched Users", adminId, "all_users");
            res.status(200).json({
                message: "Users fetched successfully",
                data: response.data.data,
            });
        }
        else {
            res.status(404).json({ message: "Error fetching users" });
        }
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message });
    }
}));
router.get('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch users from Backend 1
        const response = yield axios_1.default.get(`${BACKEND_1_URL}/admin/notes`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        });
        // If users are fetched successfully
        if (response.data && response.data.data) {
            const adminId = extractAdminIdFromToken(adminToken);
            if (!adminId) {
                res.status(401).json({ message: "Unauthorized: Invalid token" });
                return;
            }
            yield (0, Audit_1.default)("Fetched Notes", adminId, "all_Notes");
            res.status(200).json({
                message: "Notes fetched successfully",
                data: response.data.data,
            });
        }
        else {
            res.status(404).json({ message: "Error fetching Notes" });
        }
    }
    catch (error) {
        console.error("Error fetching Notes:", error);
        res.status(500).json({ message: error.message });
    }
}));
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!adminToken) {
        res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    const { id } = req.params;
    try {
        const response = yield axios_1.default.get(`${BACKEND_1_URL}/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        });
        if (response.data && response.data.data) {
            const adminId = extractAdminIdFromToken(adminToken);
            if (!adminId) {
                res.status(401).json({ message: "Unauthorized: Invalid token" });
                return;
            }
            yield (0, Audit_1.default)("Fetched Specific User", adminId, "Specific_user");
            res.status(200).json({
                message: "User fetched successfully",
                data: response.data.data,
            });
        }
        else {
            res.status(404).json({ message: "Error fetching user" });
        }
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: error.message });
    }
}));
router.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!adminToken) {
        res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    const { id } = req.params;
    try {
        const response = yield axios_1.default.delete(`${BACKEND_1_URL}/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        });
        if (response.data || response.data.data) {
            const adminId = extractAdminIdFromToken(adminToken);
            if (!adminId) {
                res.status(401).json({ message: "Unauthorized: Invalid token" });
                return;
            }
            yield (0, Audit_1.default)("Deleted Specific User", adminId, "Delete_user");
            res.status(200).json({
                message: "User Deleted successfully",
                data: response.data.data,
            });
        }
        else {
            res.status(404).json({ message: "Error Deleting user" });
        }
    }
    catch (error) {
        console.error("Error Deleting users:", error);
        res.status(500).json({ message: error.message });
    }
}));
router.get('/logs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!adminToken) {
        res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    try {
        const Audits = yield AuditLogs_1.default.find({});
        res.status(200).json({ message: "Users fetched successfully", data: Audits });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
