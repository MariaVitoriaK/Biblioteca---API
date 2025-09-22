import { Request, Response } from "express";
import { AppDataSource } from "src/config/datasource";
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
      res.status(201).send("Gênero criado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao criar gênero");
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;

    const genre = await repo().findOneBy({ id });
    if (!genre) return res.status(404).send("Gênero não encontrado");

    try {
      if (name) genre.name = name;
      await repo().save(genre);
      res.status(200).send("Gênero atualizado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao atualizar gênero");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const genre = await repo().findOneBy({ id });
    if (!genre) return res.status(404).send("Gênero não encontrado");

    try {
      await repo().delete(id);
      res.status(200).send("Gênero deletado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao deletar gênero");
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const genre = await repo().findOneBy({ id });
    if (!genre) return res.status(404).send("Gênero não encontrado");

    res.status(200).json(genre);
  }
}
