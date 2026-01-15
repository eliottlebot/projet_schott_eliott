import jwt from "jsonwebtoken";
export const generateJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secretKey", {
        expiresIn: "24h",
    });
};
