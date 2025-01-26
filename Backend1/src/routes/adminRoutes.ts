import { validateAdminToken } from "../middlewares/authMiddleware";
import noteModel from "../models/noteModel";
import express, { Request, Response, Router } from "express";
import userModel from "../models/userModel";
const router = express.Router();

router.get("/notes", validateAdminToken, async (req: Request, res: Response) => {
    try {
      // Fetch only the required fields: title, _id, and status
      const notes = await noteModel.find({}, { title: 1, status: 1 });
  
      res.status(200).json({ message: "Notes fetched successfully", data: notes });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  router.get('/users', validateAdminToken, async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userModel.find({}, { name: 1, email: 1 });
  
      // Send response with fetched data
      res.status(200).json({ message: "Users fetched successfully", data: users });
    } catch (e) {
      console.error("Error fetching users:", e);
      res.status(500).json({ message: (e as Error).message });
    }
  });
  router.get('/users/:id', validateAdminToken, async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      // Fetch user by ID with specific fields
      const user = await userModel.findById(id, { name: 1, email: 1 });
  
      if (!user) {
         res.status(404).json({ message: "User not found" });
        return
        }
  
      res.status(200).json({ message: "User fetched successfully", data: user });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  });
  router.delete('/users/:id', validateAdminToken, async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      // Fetch user by ID with specific fields
      const user = await userModel.findByIdAndDelete(id);
  
      if (user) {
        res.status(200).json({ message: "User Deleted successfully" });
        return
        }
else{
  res.status(404).json({ message: "User not found" });
  
}
  
    } catch (error) {
      console.error("Error Deleting user :", error);
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  
export default router;
