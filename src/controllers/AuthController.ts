import { Request, Response } from "express";
import { AppDataSource } from "src/config/datasource";
import { User } from "src/entities/User";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const repo = () => AppDataSource.getRepository(User);

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send("Missing fields");
    }

    try {
      const existing = await repo().findOneBy({ email });
      if (existing) {
        return res.status(400).send("Email already registered");
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = repo().create({ name, email, password: hashed });
      await repo().save(user);

      return res.status(201).send("User created");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error creating user");
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Missing fields");
    }

    try {
      const user = await repo().findOneBy({ email });
      if (!user) {
        return res.status(401).send("Invalid credentials");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send("Invalid credentials");
      }

      const secret: Secret = process.env.JWT_SECRET || "default_secret";

      // 🔑 Forçamos o tipo para ms.StringValue
      const expiresIn = (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"];

      const token = jwt.sign({ id: user.id }, secret, { expiresIn });

      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error logging in");
    }
  }
}
