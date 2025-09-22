// src/controllers/ReservationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "src/config/datadource";
import { Book } from "src/entities/Book";
import { Reservation } from "src/entities/Reservation";
import { User } from "src/entities/User";



const repo = () => AppDataSource.getRepository(Reservation);
const userRepo = () => AppDataSource.getRepository(User);
const bookRepo = () => AppDataSource.getRepository(Book);

export class ReservationController {
  static async getAll(req: Request, res: Response) {
    const reservations = await repo().find({ relations: ["user", "book"], order: { createdAt: "ASC" }});
    res.status(200).json(reservations);
  }

  static async create(req: Request, res: Response) {
    const { userId, bookId } = req.body;

    const user = await userRepo().findOneBy({ id: userId });
    const book = await bookRepo().findOneBy({ id: bookId });

    if (!user || !book) return res.status(400).send("User or book not found");

    try {
      const reservation = repo().create({ user, book });
      await repo().save(reservation);
      res.status(201).send("Reservation created!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating reservation");
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const reservation = await repo().findOneBy({ id });
    if (!reservation) return res.status(404).send("Reservation not found");

    try {
      await repo().delete(id);
      res.status(200).send("Reservation deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting reservation");
    }
  }
}
