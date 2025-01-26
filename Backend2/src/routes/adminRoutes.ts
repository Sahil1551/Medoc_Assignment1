import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/AminModels"; 
import jwt,{JwtPayload} from "jsonwebtoken";
import logAction from '../middleware/Audit'
import axios from 'axios'
import AuditLog from "../models/AuditLogs";
const router = express.Router();
interface AdminJwtPayload extends JwtPayload {
    _id: string;  // The _id property is required in the payload
  }
const BACKEND_1_URL = "http://localhost:5000";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "your_admin_secret";
let adminToken=""
const extractAdminIdFromToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, ADMIN_SECRET) as AdminJwtPayload;

    
        return decoded.id || null; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; // Return null if the token is invalid or expired
    }
  };
router.post('/register',async(req:Request,res:Response)=>{
    const {name,email,password}=req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          res.status(400).json({ message: "Admin already exists" });
          return;
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new admin
        const newAdmin = new Admin({ name,email, password: hashedPassword });
        await newAdmin.save();
    
        res.status(201).json({ message: "Admin registered successfully" });
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
})
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      
      const admin = await Admin.findOne({ email });
      if (!admin) {
        res.status(404).json({ message: "Admin not found" });
        return   
    }
  
      
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
         res.status(401).json({ message: "Invalid credentials" });
         return
        }
  
      
      const token = jwt.sign({ id: admin._id, role: "admin" }, ADMIN_SECRET, { expiresIn: "1h" });
        adminToken=token
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

router.get('/users', async (req: Request, res: Response): Promise<void> => {
    if (!adminToken) {
         res.status(401).json({ message: "Unauthorized: Missing token" });
      }
    
    try {
      // Fetch users from Backend 1
      const response = await axios.get(`${BACKEND_1_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
  
      // If users are fetched successfully
      if (response.data && response.data.data) {
        const adminId = extractAdminIdFromToken(adminToken);
        if (!adminId) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return   
        }
        await logAction("Fetched Users", adminId, "all_users"); 
        res.status(200).json({
          message: "Users fetched successfully",
          data: response.data.data,
        });
      } else {
        res.status(404).json({ message: "Error fetching users" });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  });
router.get('/notes', async (req: Request, res: Response): Promise<void> => {
    try {
      // Fetch users from Backend 1
      const response = await axios.get(`${BACKEND_1_URL}/admin/notes`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
  
      // If users are fetched successfully
      if (response.data && response.data.data) {
        const adminId = extractAdminIdFromToken(adminToken);
        if (!adminId) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return   
        }
        await logAction("Fetched Notes", adminId, "all_Notes"); 
        res.status(200).json({
          message: "Notes fetched successfully",
          data: response.data.data,
        });
      } else {
        res.status(404).json({ message: "Error fetching Notes" });
      }
    } catch (error) {
      console.error("Error fetching Notes:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  });
  router.get('/users/:id', async (req: Request, res: Response): Promise<void> => {
    if (!adminToken) {
         res.status(401).json({ message: "Unauthorized: Missing token" });
      }
    const {id}=req.params
    try {
      const response = await axios.get(`${BACKEND_1_URL}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
  
      if (response.data && response.data.data) {
        const adminId = extractAdminIdFromToken(adminToken);
        if (!adminId) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return   
        }
        await logAction("Fetched Specific User", adminId, "Specific_user"); 
        res.status(200).json({
          message: "User fetched successfully",
          data: response.data.data,
        });
      } else {
        res.status(404).json({ message: "Error fetching user" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  });
  router.delete('/users/:id', async (req: Request, res: Response): Promise<void> => {
    if (!adminToken) {
         res.status(401).json({ message: "Unauthorized: Missing token" });
      }
      const {id}=req.params
    try {
        
      const response = await axios.delete(`${BACKEND_1_URL}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
  
      if (response.data && response.data.data) {
        const adminId = extractAdminIdFromToken(adminToken);
        if (!adminId) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return   
        }
        await logAction("Deleted Specific User", adminId, "Delete_user"); 
        res.status(200).json({
          message: "User Deleted successfully",
          data: response.data.data,
        });
      } else {
        res.status(404).json({ message: "Error Deleting user" });
      }
    } catch (error) {
      console.error("Error Deleting users:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  });
  router.get('/logs',async(req:Request,res:Response)=>{
    if (!adminToken) {
        res.status(401).json({ message: "Unauthorized: Missing token" });
     }
   try{
    const Audits = await AuditLog.find({});
  
    res.status(200).json({ message: "Users fetched successfully", data: Audits });
  
   }
   catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  })
export default router