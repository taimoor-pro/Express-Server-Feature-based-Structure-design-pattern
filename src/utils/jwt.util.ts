import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IJwtPayload } from "../api/user/user.types";
import { config } from "../config";

const secretKey: Secret = process.env.JWT_SECRET || "defaultSecretKey";

// Sign token
export const signToken = (
  payload: IJwtPayload,
  options?: SignOptions,
): string => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
    ...options,
  });
};

// Verify token
export const verifyToken = (token: string): IJwtPayload => {
  return jwt.verify(token, secretKey) as IJwtPayload;
};
