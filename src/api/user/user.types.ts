import { JwtPayload } from "jsonwebtoken";

export type UserRole = "supAdmin" | "admin" | "player" | "coach";

export interface IJwtPayload extends JwtPayload {
  role: UserRole;
  username: string;
  email: string;
}

export type TPayload = IJwtPayload | null | undefined;

// User type definition
export type IUser = {
  username: string;
  password: string;
  email: string;
  role: UserRole;
};

// Extend the Express Request interface globally
declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}
