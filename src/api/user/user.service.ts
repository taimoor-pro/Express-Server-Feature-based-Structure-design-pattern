import User from "./user.model";
import { IUser } from "./user.types";

class UserService {
  public async createUser(userData: IUser): Promise<IUser> {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (err) {
      throw new Error("Error creating user");
    }
  }

  public async getUsers(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ users: IUser[]; total: number; pages: number }> {
    try {
      const skip = (page - 1) * limit;

      const total = await User.countDocuments();

      const pages = Math.ceil(total / limit);

      const users = await User.find().skip(skip).limit(limit);

      return { users, total, pages };
    } catch (err) {
      throw new Error("Error fetching users");
    }
  }
}

export default new UserService();
