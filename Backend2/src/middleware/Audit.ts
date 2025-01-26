import { Request, Response, NextFunction } from "express";
import AuditLog from "../models/AuditLogs";

 const logAction = async (
  action: string,
  adminId: string,
  target: string,
  details: Record<string, any> = {}
) => {
  try {
    await AuditLog.create({ action, adminId, target, details });
  } catch (error) {
    console.error("Error logging audit action:", error);
  }
};
export default logAction