import jwt from "jsonwebtoken";
export const generateJwt = (userId) => {
    return jwt.sign({
        userId,
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
export const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || "secretKey");
};
export const normalizeToken = (token) => {
    if (!token)
        return null;
    //Split id and date with |
    const parts = token.split("|");
    if (parts.length !== 2)
        return null;
    return parts[0];
};
