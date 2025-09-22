// src/controllers/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "src/config/datasource";
import { User } from "src/entities/User";


const repo = () => AppDataSource.getRepository(User);

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await repo().find({ order: { name: "ASC" }});
    res.status(200).json(users);
  }

  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = repo().create({ name, email, password });
      await repo().save(user);
      res.status(201).send("Usuário criado!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro na criação do usuário");
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const user = await repo().findOneBy({ id });
    if (!user) return res.status(404).send("Usuário não encontrado");

    try {
      if (name) user.name = name;
      if (email) user.email = email;
      await repo().save(user);
      res.status(200).send("User updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating user");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await repo().findOneBy({ id });
    if (!user) return res.status(404).send("User not found");

    try {
      await repo().delete(id);
      res.status(200).send("User deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting user");
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await repo().findOneBy({ id });
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  }
}
