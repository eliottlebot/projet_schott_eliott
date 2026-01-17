import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../generated/prisma/client";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const verifyJwt = <T = object>(token: string): T => {
  return jwt.verify(token, JWT_SECRET) as T;
};

export interface AuthRequest extends Request {
  user?: User;
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token invalide" });
  }
  try {
    const payload = verifyJwt<User>(token);
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({
      message:
        "Forbidden, vous êtes authentifié mais n'avez pas accès à la ressource, problème de permission",
    });
  }
};
