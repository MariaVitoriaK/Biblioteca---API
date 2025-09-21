// src/controllers/BookController.ts
import { Request, Response } from "express";
import { AppDataSource } from "src/config/datadource";
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

    if (!author || !genre) return res.status(400).send("Author or genre not found");

    try {
      const book = repo().create({ title, author, genre });
      await repo().save(book);
      res.status(201).send("Book created!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating book");
    }
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const { title, authorId, genreId } = req.body;

    const book = await repo().findOneBy({ id });
    if (!book) return res.status(404).send("Book not found");

    if (authorId) book.author = await authorRepo().findOneBy({ id: authorId }) || book.author;
    if (genreId) book.genre = await genreRepo().findOneBy({ id: genreId }) || book.genre;
    if (title) book.title = title;

    try {
      await repo().save(book);
      res.status(200).send("Book updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating book");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;
    const book = await repo().findOneBy({ id });
    if (!book) return res.status(404).send("Book not found");

    try {
      await repo().delete(id);
      res.status(204).send("Book deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting book");
    }
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id;
    const book = await repo().findOne({ where: { id }, relations: ["author", "genre"] });
    if (!book) return res.status(404).send("Book not found");

    res.status(200).json(book);
  }
}

