"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const auditLogSchema = new mongoose_1.default.Schema({
    action: { type: String, required: true }, // e.g., "Deleted User", "Fetched Notes"
    adminId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Admin", required: true }, // Who performed the action
    target: { type: String, required: true }, // Target of the action (e.g., user ID, note ID)
    timestamp: { type: Date, default: Date.now }, // When the action occurred
    details: { type: Object, default: {} }, // Additional metadata about the action
}, { timestamps: true });
const AuditLog = mongoose_1.default.model("AuditLog", auditLogSchema);
exports.default = AuditLog;
