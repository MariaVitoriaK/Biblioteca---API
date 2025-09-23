import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("Token faltando");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Formato de token inválido");

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret) as { id: number };
    (req as any).userId = decoded.id; 
    next();
  } catch (error) {
    return res.status(403).send("Token inválido ou expirado");
  }
};
