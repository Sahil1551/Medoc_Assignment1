import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const ADMIN_SECRET = process.env.ADMIN_SECRET || "your_admin_secret";

export const validateAdminToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized access" });
    return ;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, ADMIN_SECRET);
    req.user = decoded; // Optionally attach decoded token info to the request
    next(); // Pass control to the next middleware
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded; // Attach the decoded token to `req.user`
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
