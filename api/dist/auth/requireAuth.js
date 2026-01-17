import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const verifyJwt = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res
            .status(401)
            .json({ message: "Missing or invalid authorization header" });
        return;
    }
    console.log(JSON.stringify(authHeader));
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token invalide" });
    }
    try {
        console.log(JSON.stringify(token));
        const payload = verifyJwt(token);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(403).json({
            message: "Forbidden, vous êtes authentifié mais n'avez pas accès à la ressource, problème de permission",
        });
    }
};
