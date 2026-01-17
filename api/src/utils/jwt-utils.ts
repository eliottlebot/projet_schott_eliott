import jwt from "jsonwebtoken";

export const generateJwt = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );
};

export const verifyJwt = (token: string): { userId: string } => {
  return jwt.verify(token, process.env.JWT_SECRET || "secretKey") as {
    userId: string;
  };
};

export const normalizeToken = (token: string | undefined): string | null => {
  if (!token) return null;

  //Split id and date with |
  const parts = token.split("|");
  if (parts.length !== 2) return null;

  return parts[0];
};
