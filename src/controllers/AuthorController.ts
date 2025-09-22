// src/controllers/AuthorController.ts
import { Request, Response } from "express";
import { AppDataSource } from "src/config/datasource";
import { Author } from "src/entities/Author";



const repo = () => AppDataSource.getRepository(Author);

export class AuthorController {
  static async getAll(req: Request, res: Response) {
    const authors = await repo().find({ order: { name: "ASC" }});
    res.status(200).json(authors);
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const author = repo().create({ name });
      await repo().save(author);
      res.status(201).send("Author created!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating author");
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;

    const author = await repo().findOneBy({ id });
    if (!author) return res.status(404).send("Author not found");

    try {
      if (name) author.name = name;
      await repo().save(author);
      res.status(200).send("Author updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating author");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const author = await repo().findOneBy({ id });
    if (!author) return res.status(404).send("Author not found");

    try {
      await repo().delete(id);
      res.status(200).send("Author deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting author");
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const author = await repo().findOneBy({ id });
    if (!author) return res.status(404).send("Author not found");

    res.status(200).json(author);
  }
}
