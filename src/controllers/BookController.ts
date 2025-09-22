import { Request, Response } from "express";
import { AppDataSource } from "src/config/datasource";
import { Author } from "src/entities/Author";
import { Book } from "src/entities/Book";
import { Genre } from "src/entities/Genre";


const repo = () => AppDataSource.getRepository(Book);
const authorRepo = () => AppDataSource.getRepository(Author);
const genreRepo = () => AppDataSource.getRepository(Genre);

export class BookController {
  static async getAll(req: Request, res: Response) {
    const books = await repo().find({ relations: ["author", "genre"], order: { title: "ASC" }});
    res.status(200).json(books);
  }

  static async create(req: Request, res: Response) {
    const { title, authorId, genreId } = req.body;

    const author = await authorRepo().findOneBy({ id: authorId });
    const genre = await genreRepo().findOneBy({ id: genreId });

    if (!author || !genre) return res.status(400).send("Autor ou Gênero não encontrado");

    try {
      const book = repo().create({ title, author, genre });
      await repo().save(book);
      res.status(201).send("Livro criado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao criar livro");
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, authorId, genreId } = req.body;

    const book = await repo().findOneBy({ id });
    if (!book) return res.status(404).send("Livro não encontrado");

    if (authorId) book.author = await authorRepo().findOneBy({ id: authorId }) || book.author;
    if (genreId) book.genre = await genreRepo().findOneBy({ id: genreId }) || book.genre;
    if (title) book.title = title;

    try {
      await repo().save(book);
      res.status(200).send("Livro atualizado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao atualizar livro");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const book = await repo().findOneBy({ id });
    if (!book) return res.status(404).send("Livro não encontrado");

    try {
      await repo().delete(id);
      res.status(200).send("Livro deletado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao deletar livro");
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const book = await repo().findOne({ where: { id }, relations: ["author", "genre"] });
    if (!book) return res.status(404).send("Livro não encontrado");

    res.status(200).json(book);
  }
}

