import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/ormconfig";
import { User } from "../users/user.entity";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    return token;
  }
}