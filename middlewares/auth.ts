// Import express types
import type { Request, Response, NextFunction } from "express";

// Import jwt
import jwt from "jsonwebtoken";

// Define an interface for the decoded token payload
interface DecodedToken {
  id: string;
}

// Define a middleware to verify the token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from authorization header
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthenticated." });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Add userId to request object
    const decodedToken = decoded as DecodedToken;
    (req as any).userId = decodedToken.id;
    next();
  });
};

export default verifyToken;
