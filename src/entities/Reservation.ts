// src/Entities/Reservation.ts
import { Entity, PrimaryColumn, ManyToOne, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;


  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Book)
  book: Book;

  @CreateDateColumn()
  createdAt: Date;
}
