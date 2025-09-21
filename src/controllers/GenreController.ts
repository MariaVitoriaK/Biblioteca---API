// src/controllers/GenreController.ts
import { Request, Response } from "express";
import { AppDataSource } from "src/config/datadource";
import { Genre } from "src/entities/Genre";

const repo = () => AppDataSource.getRepository(Genre);

export class GenreController {
  static async getAll(req: Request, res: Response) {
    const genres = await repo().find({ order: { name: "ASC" }});
    res.status(200).json(genres);
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const genre = repo().create({ name });
      await repo().save(genre);
      res.status(201).send("Genre created!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating genre");
    }
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const { name } = req.body;

    const genre = await repo().findOneBy({ id });
    if (!genre) return res.status(404).send("Genre not found");

    try {
      if (name) genre.name = name;
      await repo().save(genre);
      res.status(200).send("Genre updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating genre");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;
    const genre = await repo().findOneBy({ id });
    if (!genre) return res.status(404).send("Genre not found");

    try {
      await repo().delete(id);
      res.status(204).send("Genre deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting genre");
    }
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id;
    const genre = await repo().findOneBy({ id });
    if (!genre) return res.status(404).send("Genre not found");

    res.status(200).json(genre);
  }
}
