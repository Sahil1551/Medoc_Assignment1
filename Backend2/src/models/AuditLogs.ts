import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g., "Deleted User", "Fetched Notes"
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Who performed the action
    target: { type: String, required: true }, // Target of the action (e.g., user ID, note ID)
    timestamp: { type: Date, default: Date.now }, // When the action occurred
    details: { type: Object, default: {} }, // Additional metadata about the action
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
