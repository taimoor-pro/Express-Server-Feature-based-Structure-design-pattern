import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt.util";
import UserModel from "../user/user.model";
import { IUser, UserRole } from "../user/user.types";

class AuthService {
  public async register(userData: IUser): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await UserModel.create({
        ...userData,
        password: hashedPassword,
      });
      return user;
    } catch (err) {
      if (
        err instanceof Error &&
        "code" in err &&
        (err as { code: number }).code === 11000
      ) {
        throw new Error("Duplicate key error: Email already exists");
      }
      if (err instanceof Error) {
        throw new Error(`Error registering user: ${err.message}`);
      }
      throw new Error("Unexpected error occurred during registration");
    }
  }

  public async login(email: string, password: string): Promise<string> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = signToken({
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
      });

      return token;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Error during login: ${err.message}`);
      }
      throw new Error("Unexpected error occurred during login");
    }
  }

  public async checkRole(userId: string, role: UserRole): Promise<boolean> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user.role === role;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Error checking role: ${err.message}`);
      }
      throw new Error("Unexpected error occurred while checking role");
    }
  }
}

export default new AuthService();
