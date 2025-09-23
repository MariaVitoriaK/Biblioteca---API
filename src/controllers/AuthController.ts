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
      return res.status(400).json({ message: "Alguns campos estão faltando" });
    }

    try {
      const existing = await repo().findOneBy({ email });
      if (existing) {
        return res.status(400).json({ message: "Email já está em uso" });
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = repo().create({ name, email, password: hashed });
      await repo().save(user);

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Alguns campos estão faltando" });
    }

    try {
      const user = await repo().findOneBy({ email });
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const secret: Secret = process.env.JWT_SECRET || "default_secret";
      const expiresIn = (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"];

      const token = jwt.sign({ id: user.id }, secret, { expiresIn });

      return res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  }
}
