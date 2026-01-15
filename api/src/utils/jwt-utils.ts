import jwt from "jsonwebtoken";

export const generateJwt = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secretKey", {
    expiresIn: "24h",
  });
};
