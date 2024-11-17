import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface for decoded payload type
interface JwtPayload {
  id: number;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Obtaining the Authorization headers token
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If the token is not passed
  if (!token) {
    res.status(401).json({ message: "Unauthorized access. Token not provided." });
    return;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // We add the decoded userId to the request to be able to use it in the drivers
    req.body.userId = decoded.id;
    
    // We continue with the next function (validateDto or the controller)
    next();
  } catch (error) {
    res.status(403).json({ message: "Access denied. Invalid token." });
    return;
  }
};