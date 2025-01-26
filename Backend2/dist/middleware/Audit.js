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
const AuditLogs_1 = __importDefault(require("../models/AuditLogs"));
const logAction = (action_1, adminId_1, target_1, ...args_1) => __awaiter(void 0, [action_1, adminId_1, target_1, ...args_1], void 0, function* (action, adminId, target, details = {}) {
    try {
        yield AuditLogs_1.default.create({ action, adminId, target, details });
    }
    catch (error) {
        console.error("Error logging audit action:", error);
    }
});
exports.default = logAction;
